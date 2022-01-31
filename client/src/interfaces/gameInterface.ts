import { ICategory } from "./categoryInterface";

export interface ISettings {
  categories: ICategory[];
}

export interface IGame {
  id?: string;
  name: string;
  settings: ISettings;
}
