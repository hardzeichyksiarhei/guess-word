import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Game {
  @Prop()
  name: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
