import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { MongooseModule } from '@nestjs/mongoose';

import { CategorySeed } from './seeds/category.seed';
import { CategoryModule } from '../modules/categories/category.module';
import { WordModule } from '../modules/words/word.module';

import {
  Category,
  CategorySchema,
} from '../modules/categories/category.schema';
import { Word, WordSchema } from '../modules/words/word.schema';

@Module({
  imports: [
    CommandModule,
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Word.name, schema: WordSchema }]),
    CategoryModule,
    WordModule,
  ],
  providers: [CategorySeed],
  exports: [CategorySeed],
})
export class SeedsModule {}
