import { Module } from '@nestjs/common';
import { MemoService } from './memo.service';
import { MemoController } from './memo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo } from './common/memo.entity';
import { User } from '../user/common/user.entity';
import { File } from '../file/file.entity';
import { MemoFile } from './common/memo-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Memo, File, MemoFile], 'memos')],
  providers: [MemoService],
  controllers: [MemoController],
  exports: [MemoService],
})
export class MemoModule {}
