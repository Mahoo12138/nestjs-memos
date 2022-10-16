import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { User } from '../user/common/user.entity';
import { RowStatus } from '../user/common/user.type';

@Entity()
export class Shortcut extends BaseEntity {
  @ManyToOne(() => User, (user) => user.shortcuts)
  creatorId: number;

  @Column({
    // type: 'enum',
    // enum: RowStatus,
    default: RowStatus.normal,
  })
  rowStatus: RowStatus;

  @Column()
  title: string;

  @Column({
    nullable: false,
  })
  payload: string;
}
