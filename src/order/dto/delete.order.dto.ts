import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteOrderDTO {
  @ApiProperty({ example: 'orderId', type: String })
  @IsNotEmpty()
  @IsString()
  id: string;
}
