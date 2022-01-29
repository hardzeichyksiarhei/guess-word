import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IWordDocument } from './word.interface';

@Schema({ timestamps: true })
export class Word {
  @Prop()
  value: string;

  @Prop()
  weight: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  category: string;

  static toResponse({ id, value, weight }) {
    return { id, value, weight };
  }
}

export const WordSchema = SchemaFactory.createForClass(Word);

WordSchema.virtual('id').get(function virtualId(this: IWordDocument) {
  return this._id.toHexString();
});

WordSchema.set('toJSON', { virtuals: true });
