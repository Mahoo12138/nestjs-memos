import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/common/transform.interceptor';
import { SessionGuard } from '../auth/session.auth.guard';
import { FindMemosDto } from '../memo/common/memo.dto';
import { Visibility } from '../memo/common/memo.types';
import { SessionUser } from '../user/common/user.decorator';
import { User } from '../user/common/user.entity';
import { RowStatus } from '../user/common/user.type';
import { TagService } from './tag.service';

@UseInterceptors(TransformInterceptor)
@Controller('/api/tag')
export class TagController {
  constructor(private tagService: TagService) {}
  @UseGuards(SessionGuard)
  @Get()
  async getTagList(
    @Query('creatorId') creatorId: number,
    @SessionUser() user: User,
  ) {
    const dto = new FindMemosDto();
    dto.rowStatus = RowStatus.normal;
    dto.contentSearch = '#';
    dto.visibilityList = [];
    if (creatorId) {
      dto.creatorId = creatorId;
      dto.visibilityList.push(Visibility.PUBLIC);
    } else {
      dto.creatorId = user.id;
    }
    return await this.tagService.findTagsList(dto);
  }
}
