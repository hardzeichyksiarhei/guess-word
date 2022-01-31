export interface ICategory {
  id?: string;
  slug: string;
  label: string;
  words: string[];
}

export type Category = Required<ICategory>;
