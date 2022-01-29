import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ICategoryDocument } from './category.interface';

@Schema({ timestamps: true })
export class Category {
  @Prop()
  slug: string;

  @Prop()
  label: string;

  @Prop()
  words: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'Word';
    },
  ];

  static toResponse({ id, slug, label }) {
    return { id, slug, label };
  }
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.virtual('id').get(function virtualId(this: ICategoryDocument) {
  return this._id.toHexString();
});

CategorySchema.set('toJSON', { virtuals: true });
