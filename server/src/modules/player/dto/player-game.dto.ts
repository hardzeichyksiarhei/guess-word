import { IsOptional, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  gameId: string;

  @IsString()
  nickname: string;

  @IsOptional()
  @IsString()
  avatar: string | null;
}
