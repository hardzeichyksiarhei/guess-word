import { Document } from 'mongoose';

import { IGame } from '../games/game.interface';

export interface IPlayer {
  gameId: IGame;
  nickname: string;
  avatar: string | null;
  isOwner: boolean;
}

export interface IPlayerDocument extends IPlayer, Document {
  id: string;
}
