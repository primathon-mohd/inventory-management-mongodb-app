import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerDto } from 'src/vendor/dto';
import { Request } from 'express';
import { RegisteredUser, UserDocument } from 'src/registration/schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TypeRole } from 'src/registration/dto';
import { JwtGuard } from 'src/registration/guard';

@Controller('customer')
@ApiTags('customer')
@ApiResponse({
  status: 400,
  description: 'Bad Request',
})
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class UserController {
  constructor(
    private userService: UserService,
    @InjectModel(RegisteredUser.name)
    private readonly registeredUserModel: Model<UserDocument>,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Customer Details are successfully added..',
  })
  @ApiBody({ type: CustomerDto })
  @Post('create')
  async createUser(@Body() customerDto: CustomerDto, @Req() req: Request) {
    console.log('Inside create vendor ', req.user['email']);
    const vendor = await this.registeredUserModel.findOne({
      email: req.user['email'],
    });
    if (vendor.role !== TypeRole.CUSTOMER.toString()) {
      throw new HttpException('Invalid vendor details ', HttpStatus.NOT_FOUND);
    }
    return await this.userService.createUser(customerDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Customer Details are successfully updated..',
  })
  @ApiBody({ type: CustomerDto })
  @Post('update')
  async updateUser(
    @Body() customerDto: CustomerDto,
    @Param('id', ParseIntPipe) user_id: number,
    @Req() req: Request,
  ) {
    const vendor = await this.registeredUserModel.findOne({
      email: req.user['email'],
    });
    if (vendor.role !== TypeRole.CUSTOMER.toString()) {
      throw new HttpException('Invalid vendor details ', HttpStatus.NOT_FOUND);
    }
    return await this.userService.updateUser(customerDto, user_id);
  }

  @ApiResponse({
    status: 200,
    description: 'Customer Details are successfully fetched retrieved..',
  })
  @Get('get/:id')
  async getUser(
    @Param('id', ParseIntPipe) user_id: number,
    @Req() req: Request,
  ) {
    const vendor = await this.registeredUserModel.findOne({
      email: req.user['email'],
    });
    if (vendor.role !== TypeRole.CUSTOMER.toString()) {
      throw new HttpException(
        'Invalid customer details ',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.userService.getUser(user_id);
  }

  @ApiResponse({
    status: 200,
    description: 'Vendor Details are successfully deleted..',
  })
  @Get('delete/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) user_id: number,
    @Req() req: Request,
  ) {
    const vendor = await this.registeredUserModel.findOne({
      email: req.user['email'],
    });
    if (vendor.role !== TypeRole.CUSTOMER.toString()) {
      throw new HttpException('Invalid vendor details ', HttpStatus.NOT_FOUND);
    }
    return await this.userService.deleteUser(user_id);
  }
}
