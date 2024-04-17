import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export enum TypeRole {
  VENDOR = 'vendor',
  USER = 'user',
  CUSTOMER = 'customer',
}

export class SignUpDto {
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

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(TypeRole)
  @ApiProperty({
    enum: ['vendor', 'user', 'customer'],
    required: false,
    // default: 'user',
    description: 'role defined , either vendor or user',
    default: TypeRole.CUSTOMER,
  })
  role?: TypeRole;
}
