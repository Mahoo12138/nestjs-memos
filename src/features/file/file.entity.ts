import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { Memo } from '../memo/common/memo.entity';
import { User } from '../user/common/user.entity';

@Entity()
export class File extends BaseEntity {
  @ManyToOne(() => User, (user) => user.id)
  creatorId: User;

  @Column()
  filename: string;

  @Column({
    select: false,
  })
  destname: string;

  @Column({
    select: false,
  })
  destination: string;

  @Column()
  type: string;

  @Column()
  size: number;

  linkedMemos: Memo[];

  @Column()
  hash: string;

  @Column({
    default: 1,
  })
  linkedMemoAmount: number;
}
