import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetProductListDTO {
  @ApiProperty({ example: 0, type: Number })
  @IsNotEmpty()
  @IsNumber()
  take: number;

  @ApiProperty({ example: 10, type: Number })
  @IsNotEmpty()
  @IsNumber()
  skip: number;

  @ApiProperty({ example: 'categoryId', type: String })
  @IsOptional()
  @IsString()
  categoryId?: string;
}
