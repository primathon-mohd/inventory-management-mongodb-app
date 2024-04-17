import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OrderStatus, PaymentStatus } from 'src/utils/constants.load';
import { ProductDto } from './product.dto';
import { Type } from 'class-transformer';

export class OrderDto {
  @ApiProperty({
    description: 'order Information !!',
    required: true,
  })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  order_id?: number;

  @ApiProperty({
    description: 'Customer and Order Information !!',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  customer_id: number;

  @ApiProperty({
    description: 'Order status Information !!',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  order_status?: OrderStatus;

  @ApiProperty({
    description: 'Payment status Information !!',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  payment_status?: PaymentStatus;

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
}
