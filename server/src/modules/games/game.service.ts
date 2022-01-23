import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IGameDocument } from './game.interface';
import { Game } from './game.schema';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private readonly model: Model<IGameDocument>,
  ) {}

  async create(createGameDto: CreateGameDto) {
    const game = new this.model(createGameDto);
    return game.save();
  }

  async findAll(): Promise<Game[]> {
    return this.model.find().exec();
  }
}
