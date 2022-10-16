import { IsNumber, IsString } from 'class-validator';
import { UserSettingKey, UserSettingValue } from './setting.type';

export class UserSettingFindDto {
  @IsNumber()
  userId: number;

  @IsString()
  key: UserSettingKey;
}

export class UserSettingCreateDto {
  @IsString()
  value: UserSettingValue;

  @IsString()
  key: UserSettingKey;
}
