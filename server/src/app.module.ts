import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MONGO_CONNECTION_STRING } from './environments';

import { GameModule } from './modules/games/game.module';

@Module({
  imports: [MongooseModule.forRoot(MONGO_CONNECTION_STRING), GameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
