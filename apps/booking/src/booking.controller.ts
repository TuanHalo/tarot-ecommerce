import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createBookingDto: CreateBookingDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.bookingService.create(createBookingDto, user._id);
  }

  @MessagePattern('bookingTime')
  bookingTime(consultantId: string) {
    return this.bookingService.bookingTime(consultantId);
  }
}
