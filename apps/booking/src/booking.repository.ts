import { AbstractRepository } from '@app/common/database/abstract.repository';
import { BookingDocument } from './models/booking.schema';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class BookingRepository extends AbstractRepository<BookingDocument> {
  protected readonly logger = new Logger(BookingRepository.name);

  constructor(
    @InjectModel(BookingDocument.name) bookingModel: Model<BookingDocument>,
  ) {
    super(bookingModel);
  }
}
