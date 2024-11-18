import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ versionKey: false })
export class ProductDocument extends AbstractDocument {
  @Prop()
  image: string[];

  @Prop()
  name: string;

  @Prop()
  sold: number;

  @Prop()
  time: number[];

  @Prop()
  price: number[];

  @Prop({ type: SchemaTypes.ObjectId })
  consultantId: Types.ObjectId;

  @Prop()
  description: string;

  @Prop()
  review: number;
}

export const ProductSchema = SchemaFactory.createForClass(ProductDocument);
