import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { FilterQuery, Types } from 'mongoose';
import { ProductDocument } from './models/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async pagination({ name, consultantId, page, limit }: SearchProductDto) {
    const skip = (page - 1) * limit;
    const query: FilterQuery<ProductDocument> = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (consultantId) {
      query.consultantId = { $eq: consultantId };
    }

    return await this.productRepository.pagination(query, skip, limit);
  }

  async findOne(_id: string) {
    return await this.productRepository.findOne({ _id });
  }

  async create(createProductDto: CreateProductDto, consultantId: string) {
    return await this.productRepository.create({
      ...createProductDto,
      consultantId: new Types.ObjectId(consultantId),
      sold: 0,
    });
  }

  async updateOne(updateProductDto: UpdateProductDto, _id: string) {
    return await this.productRepository.findOneAndUpdate(
      { _id },
      { $set: updateProductDto },
    );
  }

  async deleteOne(_id: string) {
    return await this.productRepository.findOneAndDelete({ _id });
  }
}
