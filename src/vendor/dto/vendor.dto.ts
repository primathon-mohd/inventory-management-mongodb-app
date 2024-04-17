import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { VendorType } from 'src/utils/constants.load';
import { ProductDto } from './product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { OrderDto } from './order.dto';

export class VendorDto {
  @ApiProperty({
    description: 'Vendor id field',
    required: false,
    type: 'number',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  vendor_id?: number;

  @ApiProperty({
    description: 'Vendor name field',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  vendor_name: string;

  @ApiProperty({
    description: 'Vendor email field',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Vendor mobile field',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  mobile: string;

  @ApiProperty({
    description: 'Vendor address field',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Vendor fax field',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  fax: string;

  @ApiProperty({
    description: 'Vendor type field',
    required: false,
    type: 'string',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(VendorType)
  vendorType: VendorType;

  @ApiProperty({
    description: 'Product Information !!',
    required: false,
  })
  @ApiProperty({ type: () => [ProductDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  @IsArray()
  products?: ProductDto[];

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
