import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/common/transform.interceptor';
import { SessionGuard } from '../auth/session.auth.guard';
import { SessionUser } from '../user/common/user.decorator';
import { User } from '../user/common/user.entity';
import { CreateShortcutDto } from './common/CreateShortcutDto';
import { FindShortCutsDto } from './common/FindShortcutsDto';
import { ShortcutService } from './shortcut.service';

@UseInterceptors(TransformInterceptor)
@UseGuards(SessionGuard)
@Controller('/api/shortcut')
export class ShortcutController {
  constructor(private shortcutService: ShortcutService) {}

  @Post()
  async createShortcut(
    @Body() dto: CreateShortcutDto,
    @SessionUser() user: User,
  ) {
    if (!dto.creatorId) dto.creatorId = user.id;
    return await this.shortcutService.createShortcut(dto);
  }

  @Get()
  async findShortCuts(
    @Body() dto: FindShortCutsDto,
    @SessionUser() user: User,
  ) {
    if (!dto.creatorId) dto.creatorId = user.id;
    return await this.shortcutService.findShortcutList(dto);
  }

  @Delete('/:id')
  async deleteShortcut(@Param('id') id: number) {
    await this.shortcutService.deleteShortcut(id);
  }

  @Patch('/:id')
  async updateShortcut(
    @Param('id') id: number,
    @Body() dto: CreateShortcutDto,
  ) {
    return await this.shortcutService.patchShortcut(id, dto);
  }
}
