import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { StatusOrder } from 'libs/status.order';

export class UpdateStatusOrderDTO {
  @ApiProperty({ example: 'orderId', type: String })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ enum: StatusOrder, example: StatusOrder.DELIVERING })
  @IsNotEmpty()
  @IsString()
  status: StatusOrder;
}
