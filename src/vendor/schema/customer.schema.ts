import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CustomerGroup, Gender } from 'src/utils/constants.load';
import { Order } from './order.schema';

@Schema({ timestamps: true })
export class Customer {
  @Prop({ unique: true, isRequired: true, type: Number })
  customer_id: number;

  @Prop({ isRequired: true, type: String })
  firstName: string;

  @Prop({ isRequired: false, type: String })
  lastName?: string;

  @Prop({ isRequired: true, type: String })
  address: string;

  @Prop({ unique: true, isRequired: true, type: String })
  email: string;

  @Prop({ isRequired: true, type: String })
  mobile: string;

  @Prop({ isRequired: false, type: 'enum', default: Gender.FEMALE.toString() })
  gender?: Gender;

  @Prop({
    isRequired: false,
    type: 'enum',
    default: CustomerGroup.ADULT.toString(),
  })
  customerGroup?: CustomerGroup;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  orders?: Order[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
export type CustomerDocument = Document & Customer;
