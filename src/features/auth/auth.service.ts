import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  PasswordIncorrectException,
  UserNotFoundException,
} from '../user/user.exception';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new UserNotFoundException('Could not find this user');
    }
    const passwdValid = await bcrypt.compare(password, user.password);
    if (user) {
      if (!passwdValid) {
        throw new PasswordIncorrectException('Password is incorrect');
      }
      delete user.password;
      return user;
    }
    return null;
  }
  async validateOpenId(openId: string) {
    return await this.userService.checkUserByOpenId(openId);
  }
}
