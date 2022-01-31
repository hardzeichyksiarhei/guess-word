import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IGameDocument } from './game.interface';
import { Game } from './game.schema';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private readonly model: Model<IGameDocument>,
  ) {}

  async create(createGameDto: CreateGameDto) {
    const game = new this.model(createGameDto);
    return game.save();
  }

  async editById(id: string, updateGameDto: UpdateGameDto) {
    const game = await this.model
      .findOneAndUpdate({ id }, updateGameDto, {
        new: true,
      })
      .exec();
    return game;
  }

  async findById(id: string): Promise<IGameDocument> {
    return this.model.findById(id).exec();
  }

  async findAll(): Promise<Game[]> {
    return this.model.find().exec();
  }

  async deleteById(id: string) {
    const game = await this.model.findById(id).exec();
    return game.deleteOne();
  }
}
