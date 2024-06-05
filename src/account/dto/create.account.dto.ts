import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountDTO {
  @ApiProperty({ example: 'Nguyễn Văn A', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'a@gmail.com', type: String })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: '090456789', type: String })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'Quận 1, TP HCM', type: String })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ example: new Date(), type: Date })
  @IsNotEmpty()
  @IsString()
  dayOfBirth: Date;

  @ApiProperty({ example: 'URL', type: String })
  @IsNotEmpty()
  @IsString()
  avatar: string;

  @ApiProperty({ enum: ['male', 'female'], type: String })
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiProperty({
    enum: ['ShopOwner', 'Customer', 'DataScientist'],
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  role: string;
}
