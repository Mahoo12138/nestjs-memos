import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from '../user/user.service';
import { LocalAuthGuard } from './local.auth.guard';
import { UserAlreadySignException } from '../exceptions/user-already-sign.exception';
import { UserCreateDto } from '../user/common/user.dto';
import { TransformInterceptor } from 'src/common/transform.interceptor';

@UseInterceptors(TransformInterceptor)
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async addUser(@Body() dto: UserCreateDto) {
    const user = await this.userService.findUserByEmail(dto.email);
    if (user) {
      throw new UserAlreadySignException('The User is alreay sign');
    }

    const result = await this.userService.createUser(dto);
    return result;
  }

  @UseGuards(LocalAuthGuard) // @UseGuards(AuthGuard('local'))
  @Post('/signin')
  login(@Request() req) {
    return {
      user: req.user,
      msg: 'User logged in',
    };
  }

  @Post('/logout')
  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return 'The user session has ended';
  }

  @Get('/protected')
  getHello(@Request() req): string {
    return req.user;
  }
}
