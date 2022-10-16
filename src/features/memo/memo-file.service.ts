import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemoFile } from './common/memo-file.entity';

@Injectable()
export class MemoFileService {
  constructor(
    @InjectRepository(MemoFile, 'memos')
    private memoFileRepo: Repository<MemoFile>,
  ) {}
}
