import { RegistrationModule } from 'src/registration/registration.module';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisteredUser, RegisteredUserSchema } from 'src/registration/schema';
import {
  Vendor,
  VendorSchema,
  Customer,
  CustomerSchema,
  Product,
  ProductSchema,
  Order,
  OrderSchema,
} from 'src/vendor/schema';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    MongooseModule.forFeature([
      { name: RegisteredUser.name, schema: RegisteredUserSchema },
      { name: Vendor.name, schema: VendorSchema },
      { name: Customer.name, schema: CustomerSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
    ConfigModule,
    JwtModule,
    RegistrationModule,
  ],
  exports: [],
})
export class ProductModule {}
