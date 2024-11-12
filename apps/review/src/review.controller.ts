import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createReviewDto: CreateReviewDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.reviewService.create(createReviewDto, user._id);
  }

  @Get('product/:id')
  findOfProduct(@Param('id') productId: string) {
    return this.reviewService.findOfProduct(productId);
  }

  @Get('consultant/:id')
  findOfConsultant(@Param('id') consultantId: string) {
    return this.reviewService.findOfConsultant(consultantId);
  }
}
