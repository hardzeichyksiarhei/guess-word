export interface ISettings {
  categories: string[];
}

export interface IGame {
  id: string | null;
  name: string;
  settings: ISettings;
}

export interface Game extends Required<IGame> {}
