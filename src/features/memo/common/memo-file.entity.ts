import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'memo_file_map',
})
export class MemoFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileId: number;

  @Column()
  memoId: number;
}
