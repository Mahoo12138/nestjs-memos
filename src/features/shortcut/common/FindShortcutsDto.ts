import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindShortCutsDto {
  @IsOptional()
  @IsNumber()
  creatorId: number;

  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  title: string;
}
