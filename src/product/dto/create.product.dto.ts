import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {
  @ApiProperty({ example: 'Banana', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Mã sản phẩm', type: String })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ example: 'Product Type', type: String })
  @IsNotEmpty()
  @IsString()
  typeId: string;

  @ApiProperty({ example: 'Mô tả', type: String })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 152000, type: Number })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: 5, type: Number })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 'Cái', type: String })
  @IsNotEmpty()
  @IsString()
  unit: string;
}
