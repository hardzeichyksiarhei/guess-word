import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IGameDocument } from './game.interface';

@Schema({ timestamps: true })
export class Game {
  @Prop()
  name: string;

  static toResponse({ id, name }) {
    return { id, name };
  }
}

export const GameSchema = SchemaFactory.createForClass(Game);

GameSchema.virtual('id').get(function virtualId(this: IGameDocument) {
  return this._id.toHexString();
});

GameSchema.set('toJSON', { virtuals: true });
