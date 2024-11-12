import {
  IsNotEmpty,
  IsInt,
  IsString,
  Max,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  consultantId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  star: number;

  @IsString()
  @IsOptional()
  review: string = '';
}
