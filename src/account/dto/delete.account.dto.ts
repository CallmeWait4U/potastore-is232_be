import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteAccountDTO {
  @ApiProperty({ example: 'accountId', type: String })
  @IsNotEmpty()
  @IsString()
  id: string;
}
