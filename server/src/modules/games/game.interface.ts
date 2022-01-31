import { Document } from 'mongoose';

export interface ISettings {
  categories: string[];
}

export interface IGame {
  name: string;
  settings: ISettings;
}

export interface IGameDocument extends IGame, Document {
  id: string;
}
