import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { ScheduleDocument } from './models/schedule.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ScheduleRepository extends AbstractRepository<ScheduleDocument> {
  protected readonly logger = new Logger(ScheduleRepository.name);

  constructor(
    @InjectModel(ScheduleDocument.name) scheduleModel: Model<ScheduleDocument>,
  ) {
    super(scheduleModel);
  }
}
