import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAccountDTO {
  @ApiProperty({ example: 'accountId', type: String })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ required: false, example: 'Nguyễn Văn A', type: String })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, example: 'a@gmail.com', type: String })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false, example: '090456789', type: String })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ required: false, example: '8423617896', type: String })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false, example: new Date(), type: Date })
  @IsOptional()
  @IsString()
  dayOfBirth?: Date;

  @ApiProperty({ required: false, example: 'URL', type: String })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({ required: false, enum: ['male', 'female'], type: String })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({ required: false, enum: ['Admin', 'Customer'], type: String })
  @IsOptional()
  @IsString()
  role?: string;
}
