import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { VendorType } from 'src/utils/constants.load';
import { Product } from './product.schema';
import { Order } from './order.schema';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Vendor {
  @Prop({ unique: true, isRequired: true })
  vendor_id: number;

  @Prop({ isRequired: true })
  vendor_name: string;

  @Prop({ unique: true, isRequired: true })
  email: string;

  @Prop({ isRequired: true })
  mobile: string;

  @Prop({ isRequired: true })
  address: string;

  @Prop({ isRequired: false })
  fax: string;

  @Prop({ isRequired: false, default: VendorType.RETAILER.toString() })
  vendorType: VendorType;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  products?: Product[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  orders?: Order[];
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);
export type VendorDocument = Document & Vendor;
