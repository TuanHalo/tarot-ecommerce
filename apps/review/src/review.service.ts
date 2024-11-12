import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async create(createReviewDto: CreateReviewDto, userId: string) {
    return await this.reviewRepository.create({
      ...createReviewDto,
      productId: new Types.ObjectId(createReviewDto.productId),
      userId: new Types.ObjectId(userId),
      consultantId: new Types.ObjectId(createReviewDto.consultantId),
    });
  }

  async findOfProduct(productId: string) {
    return await this.reviewRepository.find({
      productId: new Types.ObjectId(productId),
    });
  }

  async findOfConsultant(consultantId: string) {
    return await this.reviewRepository.find({
      consultantId: new Types.ObjectId(consultantId),
    });
  }
}
