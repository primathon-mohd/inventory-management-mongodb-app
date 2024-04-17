import { Module } from '@nestjs/common';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RegisteredUser,
  RegisteredUserSchema,
} from './schema/registration.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [RegistrationController],
  providers: [RegistrationService, ConfigService, JwtService],
  imports: [
    MongooseModule.forFeature([
      { name: RegisteredUser.name, schema: RegisteredUserSchema },
    ]),
    ConfigModule,
    JwtModule,
  ],
  exports: [],
})
export class RegistrationModule {}
