import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisteredUser, RegisteredUserSchema } from 'src/registration/schema';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
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

@Module({
  controllers: [UserController],
  providers: [UserService],
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
  ],
  exports: [],
})
export class UserModule {}
