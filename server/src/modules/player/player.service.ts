import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
    return this.model.deleteOne({ sessionId }).exec();
  }
}
