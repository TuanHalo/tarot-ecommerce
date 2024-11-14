import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { SchemaTypes, Types } from 'mongoose';

export class TimeRange {
  @IsInt()
  @Min(0)
  @Max(1439)
  @IsNotEmpty()
  startTime: number;

  @IsInt()
  @Min(0)
  @Max(1439)
  @IsNotEmpty()
  endTime: number;
}

@Schema({ versionKey: false })
export class ScheduleDocument extends AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  userId: Types.ObjectId;

  @Prop({
    type: [TimeRange],
  })
  monday: TimeRange[];

  @Prop({
    type: [TimeRange],
  })
  tuesday: TimeRange[];

  @Prop({
    type: [TimeRange],
  })
  wednesday: TimeRange[];

  @Prop({
    type: [TimeRange],
  })
  thursday: TimeRange[];

  @Prop({
    type: [TimeRange],
  })
  friday: TimeRange[];

  @Prop({
    type: [TimeRange],
  })
  saturday: TimeRange[];

  @Prop({
    type: [TimeRange],
  })
  sunday: TimeRange[];
}

export const ScheduleSchema = SchemaFactory.createForClass(ScheduleDocument);
