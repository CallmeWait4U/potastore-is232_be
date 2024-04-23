import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDTO {
  @ApiProperty({ example: 'productId', type: String })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ example: 'Banana', type: String })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'Mã sản phẩm', type: String })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ example: 'Product Type', type: String })
  @IsOptional()
  @IsString()
  typeId?: string;

  @ApiProperty({ example: 'Mô tả', type: String })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 152000, type: Number })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ example: 5, type: Number })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiProperty({ example: 'Cái', type: String })
  @IsOptional()
  @IsString()
  unit?: string;
}
