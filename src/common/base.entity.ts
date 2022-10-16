import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    transformer: {
      to: (value) => (value ? value : new Date()),
      from: (value) =>
        typeof value === 'number' ? value : Math.trunc(value.getTime() / 1000),
    },
  })
  createdTs!: number;

  @UpdateDateColumn({
    transformer: {
      to: (value) => (value ? value : new Date()),
      from: (value) =>
        typeof value === 'number' ? value : Math.trunc(value.getTime() / 1000),
    },
  })
  updatedTs!: number;
}
