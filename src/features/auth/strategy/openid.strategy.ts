import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-localapikey-update';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class OpenIdStrategy extends PassportStrategy(Strategy, 'openid') {
  constructor(private readonly authService: AuthService) {
    super(
      { apiKeyField: 'openId', apiKeyHeader: 'OPENID' },
      async (openId: string, done: (error: Error, data: any) => {}) => {
        return await this.validate(openId, done);
      },
    );
  }

  public validate = async (
    openId: string,
    done: (error: Error, data: any) => {},
    req?: Request,
  ) => {
    const user = await this.authService.validateOpenId(openId);
    if (user) {
      done(null, user);
    }
    done(new UnauthorizedException('OpenId is invalid or inexistent!'), null);
  };
}
