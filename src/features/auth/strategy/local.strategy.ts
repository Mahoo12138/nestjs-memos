import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    // 为字段指定别名，否则会直接报错 401
    super({ usernameField: 'email', passwordField: 'password' });
  }
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UserNotFoundException('User not found');
    }
    return user;
  }
}
