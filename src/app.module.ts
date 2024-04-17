import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendorModule } from './vendor/vendor.module';
import { RegistrationModule } from './registration/registration.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  RegisteredUser,
  RegisteredUserSchema,
} from './registration/schema/registration.schema';
import {
  Customer,
  CustomerSchema,
  Order,
  OrderSchema,
  Product,
  ProductSchema,
  Vendor,
  VendorSchema,
} from './vendor/schema';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    VendorModule,
    RegistrationModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }),
    }),
    MongooseModule.forFeature([
      { name: RegisteredUser.name, schema: RegisteredUserSchema },
      { name: Vendor.name, schema: VendorSchema },
      { name: Customer.name, schema: CustomerSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
