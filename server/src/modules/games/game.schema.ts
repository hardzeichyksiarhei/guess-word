import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IGameDocument } from './game.interface';

@Schema()
export class Settings {
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    default: [],
  })
  categories: string[];

  static toResponse({ categories }) {
    return { categories };
  }
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);

@Schema({ timestamps: true })
export class Game {
  @Prop()
  name: string;

  @Prop({ type: SettingsSchema, default: { categories: [] } })
  settings: Settings;

  static toResponse({ id, name, settings }) {
    return { id, name, settings: Settings.toResponse(settings) };
  }
}

export const GameSchema = SchemaFactory.createForClass(Game);

GameSchema.virtual('id').get(function virtualId(this: IGameDocument) {
  return this._id.toHexString();
});

GameSchema.set('toJSON', { virtuals: true });
