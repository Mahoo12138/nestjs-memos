import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { RowStatus } from '../../user/common/user.type';
import { Visibility } from './memo.types';

export class CreateMemoDto {
  @IsOptional()
  @IsNumber()
  creatorId: number;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  visibility?: Visibility;

  @IsOptional()
  @IsArray()
  resourceIdList: number[];
}

export class PatchMemoDto {
  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  visibility?: Visibility;

  @IsOptional()
  @IsArray()
  resourceIdList: number[];
}

export class FindMemosDto {
  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  id: number;

  // Standard fields
  @IsOptional()
  @IsNumber()
  creatorId: number;

  @IsOptional()
  @IsEnum(RowStatus)
  rowStatus: RowStatus;

  // // Domain specific fields
  @IsOptional()
  @IsBoolean()
  pinned: boolean;

  @IsOptional()
  @IsString()
  contentSearch: string;

  @IsOptional()
  @IsArray()
  visibilityList: Visibility[];
}
