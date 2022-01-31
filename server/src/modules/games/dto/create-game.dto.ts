import { OmitType } from '@nestjs/mapped-types';

import { GameDto } from './game.dto';

export class CreateGameDto extends OmitType(GameDto, ['id'] as const) {}
