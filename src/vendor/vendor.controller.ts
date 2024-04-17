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
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { VendorDto } from './dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VendorService } from './vendor.service';
// import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/registration/guard';
import { HttpExceptionFilter } from 'src/utils/exception.filter';
import { Request } from 'express';
import { TypeRole } from 'src/registration/dto';
import { RegisteredUser, UserDocument } from 'src/registration/schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('vendor')
@ApiTags('vendor')
@ApiResponse({
  status: 400,
  description: 'Bad Request',
})
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseFilters(new HttpExceptionFilter())
export class VendorController {
  constructor(
    private vendorService: VendorService,
    @InjectModel(RegisteredUser.name)
    private readonly registeredUserModel: Model<UserDocument>,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Vendor Details are successfully added..',
  })
  @ApiBody({ type: VendorDto })
  @Post('create')
  async createVendor(@Body() vendorDto: VendorDto, @Req() req: Request) {
    console.log('Inside create vendor ', req.user['email']);
    const vendor = await this.registeredUserModel.findOne({
      email: req.user['email'],
    });
    if (vendor.role !== TypeRole.VENDOR.toString()) {
      throw new HttpException('Invalid vendor details ', HttpStatus.NOT_FOUND);
    }
    return await this.vendorService.createVendor(vendorDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Vendor Details are successfully updated..',
  })
  @ApiBody({ type: VendorDto })
  @Post('update')
  async updateVendor(
    @Body() vendorDto: VendorDto,
    @Param('id', ParseIntPipe) vendor_id: number,
    @Req() req: Request,
  ) {
    const vendor = await this.registeredUserModel.findOne({
      email: req.user['email'],
    });
    if (vendor.role !== TypeRole.VENDOR.toString()) {
      throw new HttpException('Invalid vendor details ', HttpStatus.NOT_FOUND);
    }
    return await this.vendorService.updateVendor(vendorDto, vendor_id);
  }

  @ApiResponse({
    status: 200,
    description: 'Vendor Details are successfully fetched retrieved..',
  })
  @Get('get/:id')
  async getVendor(
    @Param('id', ParseIntPipe) vendor_id: number,
    @Req() req: Request,
  ) {
    const vendor = await this.registeredUserModel.findOne({
      email: req.user['email'],
    });
    if (vendor.role !== TypeRole.VENDOR.toString()) {
      throw new HttpException('Invalid vendor details ', HttpStatus.NOT_FOUND);
    }
    return await this.vendorService.getVendor(vendor_id);
  }

  @ApiResponse({
    status: 200,
    description: 'Vendor Details are successfully deleted..',
  })
  @Get('delete/:id')
  async deleteVendor(
    @Param('id', ParseIntPipe) vendor_id: number,
    @Req() req: Request,
  ) {
    const vendor = await this.registeredUserModel.findOne({
      email: req.user['email'],
    });
    if (vendor.role !== TypeRole.VENDOR.toString()) {
      throw new HttpException('Invalid vendor details ', HttpStatus.NOT_FOUND);
    }
    return await this.vendorService.deleteVendor(vendor_id);
  }
}
