import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';
import { UserSettingValue, UserSettingKey } from './setting.type';

@Entity({
  name: 'user_setting',
})
export class UserSetting extends BaseEntity {
  @Column()
  UserID: number;

  @Column({
    nullable: false,
  })
  key: UserSettingKey;

  @Column({
    nullable: false,
  })
  value: UserSettingValue;
}
