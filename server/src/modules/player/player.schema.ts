import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Game } from '../games/game.schema';

@Schema({ timestamps: true })
export class Player {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Game' })
  gameId: Game;

  @Prop()
  nickname: string;

  @Prop()
  avatar: string | null;

  @Prop()
  isOwner: boolean;

  static toResponse({ _id, gameId, nickname, isOwner, avatar }) {
    return { id: _id, gameId, nickname, isOwner, avatar };
  }
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
