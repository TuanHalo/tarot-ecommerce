import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ versionKey: false })
export class ReviewDocument extends AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  productId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId })
  userId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId })
  consultantId: Types.ObjectId;

  @Prop()
  star: number;

  @Prop()
  review: string;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewDocument);
