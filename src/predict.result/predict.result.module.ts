import { Module } from '@nestjs/common';
import { PredictResultController } from './predict.result.controller';
import { PredictResultService } from './predict.result.service';

@Module({
  imports: [],
  providers: [PredictResultService],
  controllers: [PredictResultController],
})
export class PredictResultModule {}
