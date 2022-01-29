import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MONGO_CONNECTION_STRING } from './environments';

import { SeedsModule } from './database/seeds.module';

import { GameModule } from './modules/games/game.module';
import { PlayerModule } from './modules/player/player.module';
import { CategoryModule } from './modules/categories/category.module';
import { WordModule } from './modules/words/word.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_CONNECTION_STRING),
    SeedsModule,

    GameModule,
    PlayerModule,
    CategoryModule,
    WordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
