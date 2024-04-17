import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisteredUser, UserDocument } from 'src/registration/schema';
import { ProductDto } from 'src/vendor/dto';
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
export class ProductService {
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

  async createProduct(productDto: ProductDto) {
    const product = await this.productModel.findOne({
      product_id: productDto.product_id,
    });
    if (product) {
      throw new HttpException(
        ' Product already exists ',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await new this.productModel(productDto).save();
  }
  async updateProduct(productDto: ProductDto, product_id: any) {
    return await this.productModel.updateOne({ product_id }, productDto);
  }
  async getProduct(product_id: number) {
    return await this.productModel.findOne({ product_id });
    // throw new Error('Method not implemented.');
  }
  async deleteProduct(product_id: any) {
    // throw new Error('Method not implemented.');
    return await this.productModel.deleteOne({ product_id });
  }
}
