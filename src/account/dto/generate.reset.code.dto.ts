import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateResetCodeDTO {
  @ApiProperty({ example: 'username', type: String })
  @IsNotEmpty()
  @IsString()
  username: string;
}
