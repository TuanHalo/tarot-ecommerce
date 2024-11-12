import { IsInt, IsOptional, IsString } from 'class-validator';

export class SearchProductDto {
  @IsString()
  @IsOptional()
  name: string = '';

  @IsString()
  @IsOptional()
  consultantId: string = '';

  @IsInt()
  @IsOptional()
  page: number = 1;

  @IsInt()
  @IsOptional()
  limit: number = 10;
}
