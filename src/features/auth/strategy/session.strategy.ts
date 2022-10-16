import { Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';

@Injectable()
export class SessionStrategy extends PassportStrategy(
  Strategy,
  'memos-session',
) {
  async validate(
    @Request() req,
    done: (error: Error, data: any) => {},
  ): Promise<any> {
    // 注意，passport 的 session 数据结构，使用req.session.passport.user来访问 user session
    const user = req.session?.passport?.user;
    if (user) {
      done(null, user);
    }
    done(new UnauthorizedException('You are not login'), null);
  }
}
