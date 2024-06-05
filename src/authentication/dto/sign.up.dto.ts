import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpDTO {
  @ApiProperty({ example: 'Trần Minh Tân', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'username1', type: String })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: '123456', type: String })
  @IsNotEmpty()
  @IsString()
  password: string;
}
