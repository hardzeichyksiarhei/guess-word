import { Document } from 'mongoose';

export interface IPlayer {
  gameId: string;
  sessionId: string | null;
  nickname: string;
  avatar: string | null;
  isOwner: boolean;
  isReady: boolean;
}

export interface IPlayerDocument extends IPlayer, Document {
  id: string;
}
