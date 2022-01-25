import { OmitType } from '@nestjs/mapped-types';
import { PlayerDto } from './player.dto';

export class CreatePlayerDto extends OmitType(PlayerDto, ['id'] as const) {}
