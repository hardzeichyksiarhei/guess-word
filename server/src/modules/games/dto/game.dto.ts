import { IsString } from 'class-validator';
import { ISettings } from '../game.interface';

export class GameDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  settings: ISettings;
}
