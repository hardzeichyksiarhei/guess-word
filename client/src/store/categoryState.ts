import { makeAutoObservable } from "mobx";

import { ICategory } from "../interfaces/categoryInterface";
import { CategoryService, fakeRequest } from "../services";

class CategoryState {
  categories: ICategory[] = [];
  category: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCategories(categories: ICategory[]) {
    this.categories = categories;
  }

  setCategory(category: string | null) {
    this.category = category;
  }

  async fetchCategories() {
    try {
      const categories = await CategoryService.getAll();
      this.setCategories(categories);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CategoryState();
