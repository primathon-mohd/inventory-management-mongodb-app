import {
  Controller,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/registration/guard';
import { HttpExceptionFilter } from 'src/utils/exception.filter';
import { ProductDto } from 'src/vendor/dto';
import { ProductService } from './product.service';
import { Model } from 'mongoose';
import { RegisteredUser, UserDocument } from 'src/registration/schema';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { TypeRole } from 'src/registration/dto';

@Controller('product')
@ApiTags('product')
@ApiResponse({
  status: 400,
  description: 'Bad Request',
})
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseFilters(new HttpExceptionFilter())
export class ProductController {
  constructor(
    private productService: ProductService,
    @InjectModel(RegisteredUser.name)
    private readonly registeredUserModel: Model<UserDocument>,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'product Details are successfully added..',
  })
  @ApiBody({ type: ProductDto })
  @Post('create')
  async createProduct(productDto: ProductDto, @Req() req: Request) {
    const vendor = await this.registeredUserModel.findOne({
      email: req.user['email'],
    });
    if (vendor.role !== TypeRole.VENDOR.toString()) {
      throw new HttpException('Invalid vendor details ', HttpStatus.NOT_FOUND);
    }
    return await this.productService.createProduct(productDto);
  }

  @ApiResponse({
    status: 200,
    description: 'product Details are successfully updated..',
  })
  @ApiBody({ type: ProductDto })
  @Put('update')
  async updateProduct(
    productDto: ProductDto,
    @Param('product_id', ParseIntPipe) product_id,
    @Req() req: Request,
  ) {
    const vendor = await this.registeredUserModel.findOne({
      email: req.user['email'],
    });
    if (vendor.role !== TypeRole.VENDOR.toString()) {
      throw new HttpException('Invalid vendor details ', HttpStatus.NOT_FOUND);
    }
    return await this.productService.updateProduct(productDto, product_id);
  }

  @ApiResponse({
    status: 200,
    description: 'product Details are successfully updated..',
  })
  async getProduct(
    @Param('product_id', ParseIntPipe) product_id,
    @Req() req: Request,
  ) {
    const vendor = await this.registeredUserModel.findOne({
      email: req.user['email'],
    });
    if (vendor.role !== TypeRole.VENDOR.toString()) {
      throw new HttpException('Invalid vendor details ', HttpStatus.NOT_FOUND);
    }

    return await this.productService.getProduct(product_id);
  }

  @ApiResponse({
    status: 200,
    description: 'product Details are successfully updated..',
  })
  async deleteProduct(
    @Param('product_id', ParseIntPipe) product_id,
    @Req() req: Request,
  ) {
    const vendor = await this.registeredUserModel.findOne({
      email: req.user['email'],
    });
    if (vendor.role !== TypeRole.VENDOR.toString()) {
      throw new HttpException('Invalid vendor details ', HttpStatus.NOT_FOUND);
    }

    return await this.productService.deleteProduct(product_id);
  }
}
