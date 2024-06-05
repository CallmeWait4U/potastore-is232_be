import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetPredictResultForDataScientist } from './dto/get.predict.result.for.scientist.dto';
import { PredictResultService } from './predict.result.service';

@ApiTags('predict-result')
@Controller('predict-result')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class PredictResultController {
  constructor(private readonly predictResultService: PredictResultService) {}

  @Get('/forDataScientist')
  async getPredictResultForScientist(
    @Query() query: GetPredictResultForDataScientist,
  ) {
    return await this.predictResultService.getPredictResultForDataScientist(
      0,
      0,
      // query.take,
      // query.skip,
    );
  }
}
