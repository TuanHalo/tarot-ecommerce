import { TimeRange } from '../models/schedule.schema';

export type GetScheduleResultDto = Array<{
  day: string;
  list: TimeRange[];
}>;
