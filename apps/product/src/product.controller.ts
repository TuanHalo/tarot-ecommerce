import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  UseGuards,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  pagination(
    @Query('name') name: string,
    @Query('consultant') consultantId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.productService.pagination({ name, consultantId, page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.productService.create(createProductDto, user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateOne(updateProductDto, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.productService.deleteOne(id);
  }
}
