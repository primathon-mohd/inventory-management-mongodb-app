import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductStatus } from 'src/utils/constants.load';

export class ProductDto {
  @ApiProperty({
    description: 'Product Id field',
    required: false,
    type: 'number',
  })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  product_id?: number;

  @ApiProperty({
    description: 'Product name field',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  product_name: string;

  @ApiProperty({
    description: 'Product description field',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  product_description: string;

  @ApiProperty({
    description: 'Product price field',
    required: true,
    type: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  product_price: number;

  @ApiProperty({
    description: 'Product quantity field',
    required: true,
    type: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  product_quantity: number;

  @ApiProperty({
    description: 'Product status field',
    required: true,
    type: 'number',
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(ProductStatus)
  product_status: ProductStatus;
}
