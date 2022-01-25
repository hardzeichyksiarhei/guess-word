import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IPlayerDocument } from './player.interface';

@Schema({ timestamps: true })
export class Player {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Game' })
  gameId: string;

  @Prop()
  sessionId: string;

  @Prop()
  nickname: string;

  @Prop()
  avatar: string | null;

  @Prop()
  isOwner: boolean;

  @Prop()
  isReady: boolean;

  static toResponse({
    id,
    gameId,
    sessionId,
    nickname,
    avatar,
    isOwner,
    isReady,
  }) {
    return { id, gameId, sessionId, nickname, avatar, isOwner, isReady };
  }
}

export const PlayerSchema = SchemaFactory.createForClass(Player);

PlayerSchema.virtual('id').get(function virtualId(this: IPlayerDocument) {
  return this._id.toHexString();
});

PlayerSchema.set('toJSON', { virtuals: true });
