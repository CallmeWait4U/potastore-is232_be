import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDTO {
  @ApiProperty({ example: 'Sản phẩm tốt', type: String })
  @IsOptional()
  @IsString()
  content: string;

  @ApiProperty({ example: 2, type: Number })
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty({ example: 'productId', type: String })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({ example: 'customerId', type: String })
  @IsNotEmpty()
  @IsString()
  customerId: string;
}
