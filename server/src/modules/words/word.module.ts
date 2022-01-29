import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Word, WordSchema } from './word.schema';
import { WordService } from './word.service';

@Module({
  providers: [WordService],
  controllers: [],
  imports: [
    MongooseModule.forFeature([{ name: Word.name, schema: WordSchema }]),
  ],
  exports: [WordService],
})
export class WordModule {}
