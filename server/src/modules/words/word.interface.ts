import { Document } from 'mongoose';

export interface IWord {
  value: string;
  weight: number;
  category: string;
}

export interface IWordDocument extends IWord, Document {
  id: string;
}
