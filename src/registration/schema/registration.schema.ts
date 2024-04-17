import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TypeRole } from '../dto/signup.dto';

@Schema({ timestamps: true })
export class RegisteredUser {
  @Prop({ isRequired: false })
  username?: string;

  @Prop({ isRequired: true })
  email: string;

  @Prop({ isRequired: true })
  password: string;

  @Prop({ isRequired: true, default: TypeRole.CUSTOMER.toString() })
  role: TypeRole;
}

export const RegisteredUserSchema =
  SchemaFactory.createForClass(RegisteredUser);
export type UserDocument = RegisteredUser & Document;
