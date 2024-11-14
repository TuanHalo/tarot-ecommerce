import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsString, Min, Max } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  consultantId: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  date: Date;

  @IsInt()
  @Min(0)
  @Max(1439)
  @IsNotEmpty()
  timeStart: number;

  @IsInt()
  @Min(0)
  @Max(1439)
  @IsNotEmpty()
  timeEnd: number;
}
