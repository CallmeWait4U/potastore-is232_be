import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { writeFile } from 'fs/promises';
import { PrismaService } from 'libs/database.module';
import { FirebaseService } from 'libs/fisebase.module';
import { join } from 'path';
import { PythonShell } from 'python-shell';
import { GetProductListForCustomerResult } from 'src/product/result/get.product.list.for.customer.result';
import { v4 as uuidv4 } from 'uuid';
import { ImageModel } from './image.model';

@Injectable()
export class ImageService {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly firebase: FirebaseService;

  async predict(image: Express.Multer.File) {
    const url = await this.firebase.uploadImage(image);
    const imagePath = join('./images', image.originalname);
    await writeFile(imagePath, image.buffer);
    const options = {
      mode: 'text' as const,
      pythonOptions: ['-u'],
      scriptPath: './src/image/script', // Path to the directory containing predict.py
      args: [imagePath],
    };
    const predictResult: ImageModel = {};
    let predictName: string = '';
    await PythonShell.run('predict.py', options).then((result: string[]) => {
      const splitResult = result[2].split(',');
      let name = '';
      for (const field of splitResult) {
        const keyValue = field.split(':');
        if (keyValue[0].includes('name')) {
          name = keyValue[1].split("'")[1].toLowerCase();
          predictName = name;
          if (!predictResult[name])
            predictResult[name] = {
              OR: [
                { contains: keyValue[1].split("'")[1] },
                { contains: name },
                { contains: keyValue[1].split("'")[1].toUpperCase() },
              ],
              list: [],
            };
        }
        if (keyValue[0].includes('confidence')) {
          predictResult[name].list.push({ confidence: Number(keyValue[1]) });
        }
      }
    });
    await this.prisma.predictionResult.create({
      data: {
        id: uuidv4().toString(),
        image: url,
        result: predictName,
        dateUpload: new Date(),
      },
    });
    const conditions = [];
    for (const [prop, value] of Object.entries(predictResult)) {
      value.OR.forEach((i) => {
        conditions.push({ name: i });
      });
    }
    const data = await this.prisma.product.findMany({
      where: { OR: conditions },
      include: { comments: true },
    });
    return {
      items: data.map((i) => {
        let ratingAvg = 0;
        i.comments.map((comment) => (ratingAvg = ratingAvg + comment.rating));
        ratingAvg = ratingAvg / i.comments.length;
        return plainToClass(
          GetProductListForCustomerResult,
          { ...i, ratingAvg },
          { excludeExtraneousValues: true },
        );
      }),
    };
  }
}
