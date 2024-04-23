import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddProductCartDTO {
  @ApiProperty({ example: 'productId', type: String })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({ example: 2, type: Number })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
