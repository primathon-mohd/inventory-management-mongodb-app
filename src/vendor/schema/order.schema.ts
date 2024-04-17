import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderStatus, PaymentStatus } from 'src/utils/constants.load';
import { Product } from './product.schema';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Order {
  @Prop({ unique: true, isRequired: true })
  order_id: number;

  @Prop({ isRequired: true })
  customer_id: number;

  @Prop({ isRequired: false, default: OrderStatus.PENDING.toString() })
  order_status?: OrderStatus;

  @Prop({ isRequired: false, default: PaymentStatus.PENDING.toString() })
  payment_status?: PaymentStatus;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  orders?: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
export type OrderDocument = Document & Order;
