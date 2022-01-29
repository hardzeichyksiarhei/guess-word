import { IsNumber, IsString } from 'class-validator';

export class WordDto {
  @IsString()
  id: string;

  @IsString()
  value: string;

  @IsNumber()
  weight: number;
}
