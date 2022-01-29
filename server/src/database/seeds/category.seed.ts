import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICategoryDocument } from '../../modules/categories/category.interface';
import { Category } from '../../modules/categories/category.schema';

import { IWordDocument } from '../../modules/words/word.interface';
import { Word } from '../../modules/words/word.schema';

import * as categories from './categories.json';

@Injectable()
export class CategorySeed {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<ICategoryDocument>,
    @InjectModel(Word.name)
    private readonly wordModel: Model<IWordDocument>,
  ) {}

  @Command({
    command: 'create:categories',
    describe: 'Create a categories',
  })
  async create() {
    await this.wordModel.deleteMany({});
    await this.categoryModel.deleteMany({});

    for (const { words, ...rowCategory } of categories) {
      const wordsIds = [];
      for (const rowWord of words) {
        const word = new this.wordModel(rowWord);
        const wordSaved = await word.save();
        wordsIds.push(wordSaved.id);
      }
      const category = new this.categoryModel({
        ...rowCategory,
        words: wordsIds,
      });
      const categorySaved = await category.save();
      await this.wordModel.updateMany(
        { _id: { $in: wordsIds } },
        { category: categorySaved.id },
      );
      wordsIds.length = 0;
    }
  }
}
