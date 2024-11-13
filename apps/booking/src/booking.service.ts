import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingRepository } from './booking.repository';
import { Types } from 'mongoose';

@Injectable()
export class BookingService {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async create(createBookingDto: CreateBookingDto, userId: string) {
    return await this.bookingRepository.create({
      ...createBookingDto,
      productId: new Types.ObjectId(createBookingDto.productId),
      consultantId: new Types.ObjectId(createBookingDto.consultantId),
      userId: new Types.ObjectId(userId),
    });
  }

  async bookingTime(consultantId: string) {
    const currentDate = new Date();
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(currentDate.getDate() + 2);
    return await this.bookingRepository.find({
      consultantId,
      date: { $gte: currentDate, $lte: dayAfterTomorrow },
    });
  }
}
