import { Controller, Get } from '@nestjs/common';

import { Category } from './category.schema';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll() {
    const categories = await this.categoryService.findAll();
    return categories.map(Category.toResponse);
  }
}
