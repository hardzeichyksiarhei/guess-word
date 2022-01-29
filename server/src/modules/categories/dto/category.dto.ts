import { IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  id: string;

  @IsString()
  slug: string;

  @IsString()
  label: string;
}
