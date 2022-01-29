import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IWordDocument } from './word.interface';
import { Word } from './word.schema';

import { CreateWordDto } from './dto/create-word.dto';

@Injectable()
export class WordService {
  constructor(
    @InjectModel(Word.name)
    private readonly model: Model<IWordDocument>,
  ) {}

  async create(createWordDto: CreateWordDto) {
    const word = new this.model(createWordDto);
    return word.save();
  }
}
