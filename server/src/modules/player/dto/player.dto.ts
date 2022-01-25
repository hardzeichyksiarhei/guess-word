import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class PlayerDto {
  @IsString()
  id: string;

  @IsString()
  gameId: string;

  @IsOptional()
  @IsString()
  sessionId: string | null;

  @IsString()
  nickname: string;

  @IsOptional()
  @IsString()
  avatar: string | null;

  @IsBoolean()
  isOwner: boolean;

  @IsBoolean()
  isReady: boolean;
}
