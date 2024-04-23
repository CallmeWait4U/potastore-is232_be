import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class ProductOrder {
  @ApiProperty({ example: 'productId', type: String })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 2, type: Number })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class CreateOrderDTO {
  @ApiProperty({ example: 'customerId', type: String })
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty({ example: 'Order Number', type: String })
  @IsString()
  @IsNotEmpty()
  orderCode: string;

  @ApiProperty({ example: 13000000, type: Number })
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @ApiProperty({ type: [ProductOrder] })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductOrder)
  productOrders: ProductOrder[];
}
