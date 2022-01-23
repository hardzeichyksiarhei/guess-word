import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Game, GameSchema } from './game.schema';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';

@Module({
  providers: [GameGateway, GameService],
  controllers: [],
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
  ],
})
export class GameModule {}
