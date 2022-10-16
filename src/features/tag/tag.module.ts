import { Module } from '@nestjs/common';
import { MemoModule } from '../memo/memo.module';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [MemoModule],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
