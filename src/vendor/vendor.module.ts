import { Module } from '@nestjs/common';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationModule } from 'src/registration/registration.module';
import { Vendor, VendorSchema } from './schema/vendor.schema';
import { Customer, CustomerSchema } from './schema/customer.schema';
import {
  RegisteredUser,
  RegisteredUserSchema,
} from 'src/registration/schema/registration.schema';
import { Product, ProductSchema } from './schema/product.schema';
import { Order, OrderSchema } from './schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [VendorController],
  providers: [VendorService],
  imports: [
    MongooseModule.forFeature([
      { name: RegisteredUser.name, schema: RegisteredUserSchema },
      { name: Vendor.name, schema: VendorSchema },
      { name: Customer.name, schema: CustomerSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
    RegistrationModule,
    JwtModule,
    ConfigModule,
  ],
  exports: [],
})
export class VendorModule {}
