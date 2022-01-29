import { Document } from 'mongoose';

export interface ICategory {
  slug: string;
  label: string;
  words: string[];
}

export interface ICategoryDocument extends ICategory, Document {
  id: string;
}
