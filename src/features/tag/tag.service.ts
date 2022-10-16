import { Injectable } from '@nestjs/common';
import { FindMemosDto } from '../memo/common/memo.dto';
import { MemoService } from '../memo/memo.service';

@Injectable()
export class TagService {
  private tagRegexp = /#([^\s#]+?) /;

  constructor(private memoService: MemoService) {}
  async findTagsList(dto: FindMemosDto) {
    const memos = await this.memoService.findMemoList(dto);
    const tags: string[] = [];
    for (const memo of memos) {
      const result = this.tagRegexp.exec(memo.content);
      if (result) {
        tags.push(result[1]);
      }
    }
    return tags;
  }
}
