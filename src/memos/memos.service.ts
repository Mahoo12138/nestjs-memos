import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { User } from '../features/user/common/user.entity';
import { UserService } from '../features/user/user.service';
import { UserRole } from '../features/user/common/user.type';
import memosConfig from 'src/memos/memos.config';
import { ConfigType } from '@nestjs/config';
@Injectable()
export class MemosService implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    @Inject(memosConfig.KEY)
    private config: ConfigType<typeof memosConfig>,
  ) {}
  async onModuleInit() {
    const user = await this.userService.findUsersByRole(UserRole.host);
    if (user.length === 0) {
      const host = new User();
      host.name = this.config.hostName;
      host.email = this.config.hostEmail;
      host.role = UserRole.host;
      host.password = this.config.hostPassword;
      this.userService.createUser(host);
    }
  }
  async getStatus() {
    const host = await this.userService.findHostUser();
    return {
      host,
      profile: {
        data: '',
        mode: 'dev',
        port: 8080,
        version: '0.5.0',
      },
    };
  }
}
