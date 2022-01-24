import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Player, PlayerSchema } from './player.schema';
import { PlayerService } from './player.service';

@Module({
  providers: [PlayerService],
  controllers: [],
  imports: [
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
  ],
  exports: [PlayerService],
})
export class PlayerModule {}
