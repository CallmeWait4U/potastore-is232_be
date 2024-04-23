import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAccountDTO {
  @ApiProperty({ example: 'accountId', type: String })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ example: 'Nguyễn Văn A', type: String })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'a@gmail.com', type: String })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ example: '090456789', type: String })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ example: '8423617896', type: String })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: new Date(), type: Date })
  @IsOptional()
  @IsString()
  dayOfBirth?: Date;

  @ApiProperty({ example: 'URL', type: String })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({ enum: ['male', 'female'], type: String })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({ enum: ['Admin', 'Customer'], type: String })
  @IsOptional()
  @IsString()
  role?: string;
}
