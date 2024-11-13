import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ScheduleRepository } from './schedule.repository';
import { Types } from 'mongoose';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { BOOKING_SERVICE, PRODUCT_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, min } from 'rxjs';
import { TimeRange } from './models/schedule.schema';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    @Inject(BOOKING_SERVICE) private readonly bookingClient: ClientProxy,
    @Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy,
  ) {}

  async create(createScheduleDto: CreateScheduleDto, userId: string) {
    await this.validateCreateSchedule(userId);

    return await this.scheduleRepository.create({
      ...createScheduleDto,
      userId: new Types.ObjectId(userId),
    });
  }

  private async validateCreateSchedule(userId: string) {
    try {
      await this.scheduleRepository.findOne({ userId });
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException(
      'Schedule for this user already exits',
    );
  }

  async update(updateSchedultDto: UpdateScheduleDto, userId: string) {
    return await this.scheduleRepository.findOneAndUpdate(
      { userId },
      updateSchedultDto,
    );
  }

  async find(consultantId: string, productId: string) {
    const bookingTime = await this.findAllBookingTime(consultantId);
    const productDetail = await this.productDetail(productId);
    const consultantTime = await this.scheduleRepository.findOne({
      userId: consultantId,
    });
    const DAYOFWEEK = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ];
    const current = new Date();
    const dayOfWeek = current.getDay() - 1;
    let minute =
      (current.getHours() + 7) * 60 +
      current.getMinutes() +
      5 -
      ((current.getHours() * 60 + current.getMinutes()) % 5);

    const timeSchedule: number[][] = [];

    function addTimeSchedule(scheduletime: TimeRange[], day: number) {
      for (let time of scheduletime) {
        timeSchedule.push([time[0] + day * 1440, time[1] + day * 1440]);
      }
    }

    addTimeSchedule(consultantTime[DAYOFWEEK[dayOfWeek]], 0);
    addTimeSchedule(consultantTime[DAYOFWEEK[(dayOfWeek + 1) % 7]], 1);
    addTimeSchedule(consultantTime[DAYOFWEEK[(dayOfWeek + 2) % 7]], 2);
    timeSchedule.sort((a, b) => a[0] - b[0]);

    let bookingTimeParse: number[][] = [];

    for (let time of bookingTime) {
      const timeDate = new Date(time.date);
      bookingTimeParse.push([
        time.timeStart + (timeDate.getDate() - current.getDate()) * 1440,
        time.timeEnd + (timeDate.getDate() - current.getDate()) * 1440,
      ]);
    }
    bookingTimeParse.sort((a, b) => a[0] - b[0]);

    let result: any = [];

    function countTime(step: number) {
      let time: Array<TimeRange[]> = [[], [], []];
      let t = 0,
        b = 0,
        curr = Math.max(timeSchedule[0][0], minute);

      while (t < timeSchedule.length) {
        while (b < bookingTimeParse.length && curr > bookingTimeParse[b][1]) {
          b += 1;
        }

        while (
          b < bookingTimeParse.length &&
          curr >= bookingTimeParse[b][0] &&
          curr <= bookingTimeParse[b][1]
        ) {
          curr = bookingTimeParse[b][1];
          b += 1;
        }

        while (t < timeSchedule.length && curr > timeSchedule[t][1]) {
          t += 1;
        }

        if (t == timeSchedule.length) {
          break;
        }

        if (curr < timeSchedule[t][0]) {
          curr = timeSchedule[t][0];
        }

        if (curr + step <= timeSchedule[t][1]) {
          if (
            b < bookingTimeParse.length &&
            curr + step <= bookingTimeParse[b][0]
          ) {
            time[Math.floor(curr / 1440)].push({
              startTime: curr,
              endTime: curr + step,
            });
            curr += step;
          } else {
            time[Math.floor(curr / 1440)].push({
              startTime: curr,
              endTime: curr + step,
            });
            curr += step;
          }
        } else {
          t += 1;

          if (t < timeSchedule.length) {
            curr = timeSchedule[t][0];
          }
        }
      }

      return time;
    }

    for (let step of productDetail.time) {
      result.push(countTime(step));
    }

    return result;
  }

  private async findAllBookingTime(consultantId: string) {
    return await lastValueFrom(
      this.bookingClient.send('bookingTime', consultantId),
    );
  }

  private async productDetail(productId: string) {
    return await lastValueFrom(
      this.productClient.send('productDetail', productId),
    );
  }
}
