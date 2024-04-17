import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Username field',
    required: false,
    type: 'string',
  })
  username?: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'Email field',
    required: true,
    type: 'string',
  })
  email: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @IsString()
  @ApiProperty({
    description: 'Password field',
    required: true,
    type: 'string',
  })
  password: string;
}
