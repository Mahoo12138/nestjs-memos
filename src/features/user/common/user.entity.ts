import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';
import { Memo } from '../../memo/common/memo.entity';
import { Shortcut } from '../../shortcut/shortcut.entity';
import { UserSetting } from './setting.entity';
import { RowStatus, UserRole } from './user.type';

@Entity()
export class User extends BaseEntity {
  @Column({
    nullable: true,
  })
  name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    generated: 'uuid',
  })
  openId: string;

  @Column({
    // type: 'enum',
    default: UserRole.user,
    enum: UserRole,
  })
  role: UserRole;

  @Column({
    // type: 'enum',
    default: RowStatus.normal,
    enum: RowStatus,
  })
  rowStatus: RowStatus;

  @OneToMany(() => Memo, (memo) => memo.creatorId)
  memos: Memo[];

  @OneToMany(() => Shortcut, (shortcut) => shortcut.creatorId)
  shortcuts: Shortcut[];

  userSettingList: UserSetting[];
}
