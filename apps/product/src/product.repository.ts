import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { ProductDocument } from './models/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductRepository extends AbstractRepository<ProductDocument> {
  protected readonly logger = new Logger(ProductRepository.name);

  constructor(
    @InjectModel(ProductDocument.name) productModel: Model<ProductDocument>,
  ) {
    super(productModel);
  }
}
