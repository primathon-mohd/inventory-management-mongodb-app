import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductStatus } from 'src/utils/constants.load';

@Schema({ timestamps: true })
export class Product {
  @Prop({ unique: true, isRequired: true })
  product_id: number;

  @Prop({ isRequired: true })
  product_name: string;

  @Prop({ isRequired: true })
  product_description: string;

  @Prop({ isRequired: true })
  product_price: number;

  @Prop({ isRequired: true })
  product_quantity: number;

  @Prop({ isRequired: true, default: ProductStatus.AVAILABLE.toString() })
  product_status: ProductStatus;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
export type ProductDocument = Document & Product;
