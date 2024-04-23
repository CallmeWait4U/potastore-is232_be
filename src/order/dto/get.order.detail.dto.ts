import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetOrderDetailDTO {
  @ApiProperty({ example: 'orderId', type: String })
  @IsNotEmpty()
  @IsString()
  id: string;
}
