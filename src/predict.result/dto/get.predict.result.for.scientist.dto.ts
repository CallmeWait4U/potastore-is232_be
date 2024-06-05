import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetPredictResultForDataScientist {
  @ApiProperty({ example: 10, type: Number })
  @IsNotEmpty()
  // @IsNumber()
  take: number;

  @ApiProperty({ example: 0, type: Number })
  @IsNotEmpty()
  // @IsNumber()
  skip: number;
}
