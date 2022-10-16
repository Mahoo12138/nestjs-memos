import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/common/transform.interceptor';
import { SessionGuard } from '../auth/session.auth.guard';
import { UserSettingCreateDto } from './common/setting.dto';
import { SessionUser } from './common/user.decorator';
import { UserCreateDto, UserPatchDto } from './common/user.dto';
import { User } from './common/user.entity';
import { UserService } from './user.service';

@UseInterceptors(TransformInterceptor)
@UseGuards(SessionGuard)
@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(SessionGuard)
  @Get()
  getUserList() {
    return this.userService.findUserList();
  }

  @Post()
  async createrUser(@Body() dto: UserCreateDto) {
    return await this.userService.createUser(dto);
  }

  @Get('/me')
  getMe(@SessionUser() user: User) {
    return this.userService.findUser(user.id);
  }

  @UseGuards(SessionGuard)
  @Patch(':id')
  async patchUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UserPatchDto,
  ) {
    return await this.userService.patchUser(id, dto);
  }

  @UseGuards(SessionGuard)
  @Post('/setting')
  async getUserSetting(
    @SessionUser() user: User,
    @Body() dto: UserSettingCreateDto,
  ) {
    return await this.userService.createUserSettting(user.id, dto);
  }
}
