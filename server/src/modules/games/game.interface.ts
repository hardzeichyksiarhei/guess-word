import { Document, Model } from 'mongoose';

export interface IGame {
  name: string;
}

export interface IGameDocument extends IGame, Document {
  id: string;
}
