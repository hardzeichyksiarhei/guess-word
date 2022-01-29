import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICategoryDocument } from './category.interface';
import { Category } from './category.schema';

import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly model: Model<ICategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = new this.model(createCategoryDto);
    return category.save();
  }
}
