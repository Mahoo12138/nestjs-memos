import {
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SessionUser } from '../user/common/user.decorator';
import { User } from '../user/common/user.entity';
import { MemoService } from './memo.service';
import { Visibility } from './common/memo.types';
import { SessionGuard } from '../auth/session.auth.guard';
import { CreateMemoDto, FindMemosDto, PatchMemoDto } from './common/memo.dto';
import { TransformInterceptor } from 'src/common/transform.interceptor';

@UseInterceptors(TransformInterceptor)
@Controller('/api/memo')
export class MemoController {
  constructor(private memoService: MemoService) {}

  @UseGuards(SessionGuard)
  @Post()
  async createMemo(@Body() dto: CreateMemoDto, @SessionUser() user: User) {
    dto.creatorId = user.id;
    const memo = await this.memoService.createMemo(dto);
    return memo;
  }

  @UseGuards(SessionGuard)
  @Delete('/:id')
  async deleteMemo(@Param('id') id: number) {
    await this.memoService.deleteMemo(id);
  }

  @UseGuards(SessionGuard)
  @Patch('/:id')
  async updateMemo(@Param('id') id: number, @Body() dto: PatchMemoDto) {
    return await this.memoService.patchMemo(id, dto);
  }

  @UseGuards(SessionGuard)
  @Get()
  async getMemoList(@Query() dto: FindMemosDto, @SessionUser() user: User) {
    const visibilityList: Visibility[] = [];
    // not login: get someone public memos
    if (!user?.id) {
      if (!dto.creatorId) {
        throw new NotAcceptableException('Missing user id to find memo');
      }
      visibilityList.push(Visibility.PUBLIC);
    } else {
      // login: 1. get someone not private momes; 2.
      if (!dto.creatorId) {
        dto.creatorId = user.id;
      } else {
        visibilityList.push(Visibility.PUBLIC, Visibility.PROTECTED);
      }
    }
    // TODO: tag
    if (!dto.visibilityList) {
      dto.visibilityList = visibilityList;
    }
    return await this.memoService.findMemoList(dto);
  }

  @Get('/all')
  async getAllMemos(
    @Query() findMemosDto: FindMemosDto,
    @SessionUser() user: User,
  ) {
    findMemosDto.visibilityList = [Visibility.PUBLIC];
    if (user) {
      findMemosDto.visibilityList.push(Visibility.PROTECTED);
    }
    return await this.memoService.findMemoList(findMemosDto);
  }
}
