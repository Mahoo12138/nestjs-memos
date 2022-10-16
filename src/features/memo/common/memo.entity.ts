import { Column, Entity, ManyToOne } from 'typeorm';
import { Visibility } from './memo.types';
import { BaseEntity } from '../../../common/base.entity';
import { User } from '../../user/common/user.entity';
import { RowStatus } from '../../user/common/user.type';
import { File } from '../../file/file.entity';

@Entity()
export class Memo extends BaseEntity {
  @ManyToOne((user) => User, (user) => user.id)
  creatorId: User;

  // @ManyToOne((user) => User, (user) => user)
  creator: User;

  // @Column({
  //   type: 'enum',
  //   enum: RowStatus,
  //   default: RowStatus.normal,
  // })
  // rowStatus: RowStatus;

  @Column({
    default: RowStatus.normal,
  })
  rowStatus: RowStatus;

  @Column()
  content: string;

  // @Column({
  //   type: 'enum',
  //   enum: Visibility,
  //   default: Visibility.PRIVATE,
  // })
  @Column({
    default: Visibility.PRIVATE,
  })
  visibility: Visibility;

  @Column({
    default: false,
  })
  pinned: boolean;

  resourceList: File[];
}
