import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDTO {
  @ApiProperty({ example: 'username1', type: String })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: '123465', type: String })
  @IsNotEmpty()
  @IsString()
  password: string;
}
