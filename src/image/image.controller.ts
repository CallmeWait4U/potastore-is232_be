import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { PredictImageDTO } from './dto/predict.image.dto';
import { ImageService } from './image.service';

@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('images', 1, {
      storage: diskStorage({
        destination: './images/',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  async predict(
    @Body() body: PredictImageDTO,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const image = images[0];
    return await this.imageService.predict(`./images/${image.filename}`);
    // return [{ filename: image.filename }];
  }
}
