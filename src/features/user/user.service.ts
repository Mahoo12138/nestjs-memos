import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { UserSettingCreateDto } from './common/setting.dto';
import { UserSetting } from './common/setting.entity';
import { UserSettingKey } from './common/setting.type';
import { UserCreateDto, UserPatchDto } from './common/user.dto';
import { User } from './common/user.entity';
import { UserRole } from './common/user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'memos')
    private readonly userRepo: Repository<User>,
    @InjectRepository(UserSetting, 'memos')
    private readonly settingRepo: Repository<UserSetting>,
  ) {}
  async createUser(dto: UserCreateDto): Promise<Partial<User>> {
    const hashPassword = await this.generatePassword(dto.password);
    const user = this.userRepo.create({ ...dto, password: hashPassword });
    const { password, ...result } = await this.userRepo.save(user);
    return result;
  }

  async findUser(id: number) {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) {
      throw new UserNotFoundException('Not found the user');
    }
    user.userSettingList = await this.findUserAllSetting(id);
    return user;
  }

  async patchUser(id: number, dto: UserPatchDto) {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) {
      throw new UserNotFoundException('Not found the user');
    }

    user.password = await this.generatePassword(user.password);

    this.userRepo.merge(user, dto);
    return await this.userRepo.save(user);
  }

  async findUserList() {
    return await this.userRepo.find();
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepo
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
  }

  async findUserByWechat(wxId: number): Promise<User> {
    return this.userRepo
      .createQueryBuilder('user')
      .where('user.wxId = :wxId', { wxId })
      .getOne();
  }

  async checkUserByOpenId(openId: string): Promise<User> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .where('user.openId = :openId', { openId })
      .getOne();
    // return this.userRepo.hasId(user);
    return user;
  }

  async findUsersByRole(role: UserRole): Promise<User[]> {
    return this.userRepo.findBy({ role: role });
  }

  async findHostUser() {
    return this.userRepo.findOneBy({ role: UserRole.host });
  }

  async generatePassword(passwd: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(passwd, saltOrRounds);
  }

  async createUserSettting(
    userId: number,
    dto: UserSettingCreateDto,
  ): Promise<Partial<UserSetting>> {
    const setting = this.settingRepo.create({ ...dto, UserID: userId });
    const { updatedTs, createdTs, id, ...result } = await this.settingRepo.save(
      setting,
    );
    return result;
  }

  async findUserSettingByKey(UserID: number, key: UserSettingKey) {
    return this.settingRepo.findOne({
      where: {
        UserID,
        key,
      },
      select: { UserID: true, key: true, value: true },
    });
  }

  async findUserAllSetting(UserID: number) {
    return this.settingRepo.find({
      where: {
        UserID,
      },
      select: { UserID: true, key: true, value: true },
    });
  }
}
