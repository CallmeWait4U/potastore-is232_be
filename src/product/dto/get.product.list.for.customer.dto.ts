import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetProductListForCustomerDTO {
  @ApiProperty({ required: false, example: 'search key word', type: String })
  @IsOptional()
  @IsString()
  searchWord?: string;

  @ApiProperty({ required: false, example: 'categoryId', type: String })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({ required: false, example: 123000, type: Number })
  @IsOptional()
  // @IsNumber()
  price?: number;

  @ApiProperty({ required: false, example: 'Cái', type: String })
  @IsOptional()
  @IsString()
  unit?: string;
}
