import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteProductDTO {
  @ApiProperty({ example: 'productId', type: String })
  @IsNotEmpty()
  @IsString()
  id: string;
}
