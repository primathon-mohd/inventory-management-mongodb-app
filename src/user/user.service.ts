import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerDto } from 'src/vendor/dto';
import {
  Vendor,
  VendorDocument,
  Customer,
  CustomerDocument,
  Order,
  OrderDocument,
  Product,
  ProductDocument,
} from 'src/vendor/schema';

@Injectable()
export class UserService {
  constructor(
    private config: ConfigService,
    @InjectModel(Vendor.name)
    private readonly vendorModel: Model<VendorDocument>,
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async createUser(customerDto: CustomerDto) {
    return await new this.customerModel(customerDto).save();
  }
  async updateUser(customerDto: CustomerDto, customer_id: number) {
    // throw new Error('Method not implemented.');
    return await this.customerModel.updateOne({ customer_id }, customerDto);
  }
  async getUser(user_id: number) {
    // throw new Error('Method not implemented.');
    return await this.customerModel.findOne({ customer_id: user_id });
  }
  async deleteUser(customer_id: number) {
    // throw new Error('Method not implemented.');
    return await this.customerModel.deleteOne({ customer_id });
  }
}
