import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaType, SchemaTypes, Types } from 'mongoose';

@Schema({ versionKey: false })
export class BookingDocument extends AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  userId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId })
  consultantId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId })
  productId: Types.ObjectId;

  @Prop()
  date: Date;

  @Prop()
  timeStart: number;

  @Prop()
  timeEnd: number;
}

export const BookingSchema = SchemaFactory.createForClass(BookingDocument);
