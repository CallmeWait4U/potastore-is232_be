import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetAccountListDTO {
  @ApiProperty({ example: 0, type: Number })
  @IsNotEmpty()
  @IsNumber()
  take: number;

  @ApiProperty({ example: 10, type: Number })
  @IsNotEmpty()
  @IsNumber()
  skip: number;
}