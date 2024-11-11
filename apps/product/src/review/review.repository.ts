import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { ReviewDocument } from './models/review.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReviewRepository extends AbstractRepository<ReviewDocument> {
  protected readonly logger = new Logger(ReviewRepository.name);

  constructor(
    @InjectModel(ReviewDocument.name) reviewModel: Model<ReviewDocument>,
  ) {
    super(reviewModel);
  }
}
