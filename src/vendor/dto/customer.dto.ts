import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CustomerGroup, Gender } from 'src/utils/constants.load';
import { OrderDto } from './order.dto';
import { Type } from 'class-transformer';

export class CustomerDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer Id field',
    required: false,
    type: 'number',
  })
  customer_id?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'first Name field',
    required: true,
    type: 'string',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'last Name field',
    required: false,
    type: 'string',
  })
  lastName?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'first Name field',
    required: true,
    type: 'string',
  })
  address: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'email field',
    required: true,
    type: 'string',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'mobile field',
    required: true,
    type: 'string',
  })
  mobile: string;

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(Gender)
  @ApiProperty({
    description: 'gender field',
    required: false,
    type: 'enum',
  })
  gender?: Gender;

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(CustomerGroup)
  @ApiProperty({
    description: 'customer group field',
    required: false,
    type: 'enum',
  })
  customerGroup?: CustomerGroup;

  @ApiProperty({
    description: 'Order Information !!',
    required: false,
  })
  @ApiProperty({ type: () => [OrderDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  @IsArray()
  orders?: OrderDto[];
}
