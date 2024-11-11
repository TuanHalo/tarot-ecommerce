import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';

@Controller('review')
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
  findOfProduct(@Param('id') id: string) {
    return this.reviewService.findOfProduct(id);
  }
}
