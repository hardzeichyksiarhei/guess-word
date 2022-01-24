import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IPlayerDocument } from './player.interface';
import { Player } from './player.schema';
import { CreatePlayerDto } from './dto/player-game.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel(Player.name) private readonly model: Model<IPlayerDocument>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto) {
    const player = new this.model(createPlayerDto);
    return player.save();
  }

  async findAll(): Promise<Player[]> {
    return this.model.find().exec();
  }

  async findAllByGameId(gameId: string): Promise<Player[]> {
    return this.model.find({ gameId }).exec();
  }
}
