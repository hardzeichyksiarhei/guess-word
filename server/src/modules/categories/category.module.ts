import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Category, CategorySchema } from './category.schema';
import { CategoryService } from './category.service';

@Module({
  providers: [CategoryService],
  controllers: [],
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
