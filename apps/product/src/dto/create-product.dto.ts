import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  image: string[] = [];

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  time: number[];

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  price: number[];

  @IsString()
  @IsOptional()
  description: string = '';
}
