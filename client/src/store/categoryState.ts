import { makeAutoObservable } from "mobx";

import { Category } from "../interfaces/categoryInterface";
import { CategoryService } from "../services";

class CategoryState {
  categories: Category[] = [];
  category: Category | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCategories(categories: Category[]) {
    this.categories = categories;
  }

  setCategory(category: Category | null) {
    this.category = category;
  }

  toggleCategory(category: Category) {
    if (!this.category) {
      this.setCategory(category);
      return;
    }

    if (this.category.id === category.id) this.setCategory(null);
    else this.setCategory(category);
  }

  async fetchCategories() {
    try {
      const categories = await CategoryService.getAll();
      console.log(categories);

      this.setCategories(categories);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CategoryState();
