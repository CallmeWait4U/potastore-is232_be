import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { FirebaseService } from 'libs/fisebase.module';

@Injectable()
export class PredictResultService {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly firebase: FirebaseService;

  async getPredictResultForDataScientist(take: number, skip: number) {
    const [data, total] = await Promise.all([
      this.prisma.predictionResult.findMany({
        take: Number(take),
        skip: Number(skip),
      }),
      this.prisma.predictionResult.count(),
    ]);
    const items = await Promise.all(
      data.map(async (item) => {
        item.image = await this.firebase.getAuthenticatedFileUrl(item.image);
        return item;
      }),
    );
    return {
      items,
      total,
    };
  }
}
