import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetAccountDetailDTO {
  @ApiProperty({ example: 'accountId', type: String })
  @IsNotEmpty()
  @IsString()
  id: string;
}
