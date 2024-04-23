import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetProductListForCustomerDTO {
  @ApiProperty({ example: 'search key word', type: String })
  @IsOptional()
  @IsString()
  searchWord?: string;

  @ApiProperty({ example: 'categoryId', type: String })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({ example: 123000, type: Number })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ example: 'Cái', type: String })
  @IsOptional()
  @IsString()
  unit?: string;
}
