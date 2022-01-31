import { makeAutoObservable } from "mobx";

import { ICategory } from "../interfaces/categoryInterface";
import { CategoryService } from "../services";

class CategoryState {
  categories: ICategory[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCategories(categories: ICategory[]) {
    this.categories = categories;
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
