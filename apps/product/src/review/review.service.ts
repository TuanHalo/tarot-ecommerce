import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRepository } from './review.repository';
import { Types } from 'mongoose';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async create(createReviewDto: CreateReviewDto, userId: string) {
    return await this.reviewRepository.create({
      ...createReviewDto,
      productId: new Types.ObjectId(createReviewDto.productId),
      userId: new Types.ObjectId(userId),
    });
  }

  async findOfProduct(productId: string) {
    return await this.reviewRepository.find({
      productId: new Types.ObjectId(productId),
    });
  }
}
