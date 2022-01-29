import { PartialType } from '@nestjs/mapped-types';
import { WordDto } from './word.dto';

export class UpdateWordDto extends PartialType(WordDto) {}
