import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { TimeRange } from '../models/schedule.schema';

export class CreateScheduleDto {
  @IsArray()
  @Type(() => TimeRange)
  @IsOptional()
  monday: TimeRange[] = [];

  @IsArray()
  @Type(() => TimeRange)
  @IsOptional()
  tuesday: TimeRange[] = [];

  @IsArray()
  @Type(() => TimeRange)
  @IsOptional()
  wednesday: TimeRange[] = [];

  @IsArray()
  @Type(() => TimeRange)
  @IsOptional()
  thursday: TimeRange[] = [];

  @IsArray()
  @Type(() => TimeRange)
  @IsOptional()
  friday: TimeRange[] = [];

  @IsArray()
  @Type(() => TimeRange)
  @IsOptional()
  saturday: TimeRange[] = [];

  @IsArray()
  @Type(() => TimeRange)
  @IsOptional()
  sunday: TimeRange[] = [];
}
