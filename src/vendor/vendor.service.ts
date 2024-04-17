import { Injectable } from '@nestjs/common';
import { VendorDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisteredUser, UserDocument } from 'src/registration/schema';
import {
  Customer,
  CustomerDocument,
  Order,
  OrderDocument,
  Product,
  ProductDocument,
  Vendor,
  VendorDocument,
} from './schema';

@Injectable()
export class VendorService {
  constructor(
    private config: ConfigService,
    @InjectModel(RegisteredUser.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Vendor.name)
    private readonly vendorModel: Model<VendorDocument>,
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async createVendor(vendorDto: VendorDto) {
    // throw new Error('Method not implemented.');
    const vendorObj = await new this.vendorModel(vendorDto).save();
    console.log('vendor creation successful ', vendorObj);
    return vendorObj;
  }

  async updateVendor(vendorDto: VendorDto, vendor_id: number) {
    // throw new Error('Method not implemented.');
    return await this.vendorModel.updateOne({ vendor_id }, vendorDto);
  }

  async getVendor(vendor_id: number) {
    // throw new Error('Method not implemented.');
    return await this.vendorModel.findOne({ vendor_id });
  }
  async deleteVendor(vendor_id: number) {
    return this.vendorModel.deleteOne({ vendor_id });
    // throw new Error('Method not implemented.');
  }
}
