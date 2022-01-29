import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';

import { IPlayerDocument } from './player.interface';
import { Player } from './player.schema';

import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel(Player.name) private readonly model: Model<IPlayerDocument>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto) {
    const player = new this.model(createPlayerDto);
    return player.save();
  }

  async findOneAndUpdate(
    filter: FilterQuery<IPlayerDocument>,
    update: UpdateQuery<IPlayerDocument>,
    options?: QueryOptions,
  ) {
    const player = this.model.findOneAndUpdate(filter, update, options);
    return player;
  }

  async editById(id: string, updatePlayerDto: UpdatePlayerDto) {
    return this.model.findByIdAndUpdate(id, updatePlayerDto, { new: true });
  }

  async editBySessionId(sessionId: string, updatePlayerDto: UpdatePlayerDto) {
    return this.model.findOneAndUpdate({ sessionId }, updatePlayerDto, {
      new: true,
    });
  }

  async findAll(): Promise<IPlayerDocument[]> {
    return this.model.find().exec();
  }

  async findAllByGameId(gameId: string): Promise<IPlayerDocument[]> {
    return this.model.find({ gameId }).exec();
  }

  async findById(id: string): Promise<IPlayerDocument> {
    return this.model.findById(id).exec();
  }

  async deleteById(id: string) {
    const player = await this.model.findById(id).exec();
    return player.deleteOne();
  }

  async deleteBySessionId(sessionId: string) {
    const player = await this.model.findOne({ sessionId }).exec();
    return player.deleteOne();
  }

  async deleteByGameId(gameId: string) {
    return await this.model.deleteMany({ gameId }).exec();
  }
}
