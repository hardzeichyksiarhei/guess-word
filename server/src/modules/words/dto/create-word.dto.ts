import { OmitType } from '@nestjs/mapped-types';
import { WordDto } from './word.dto';

export class CreateWordDto extends OmitType(WordDto, ['id'] as const) {}
