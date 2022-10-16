import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShortcutDto } from './common/CreateShortcutDto';
import { FindShortCutsDto } from './common/FindShortcutsDto';
import { ShortcutNotFoundException } from './common/not-found.exception';
import { Shortcut } from './shortcut.entity';

@Injectable()
export class ShortcutService {
  constructor(
    @InjectRepository(Shortcut, 'memos')
    private shortcutRepo: Repository<Shortcut>,
  ) {}

  async createShortcut(dto: CreateShortcutDto) {
    const shortcut = this.shortcutRepo.create(dto);
    return await this.shortcutRepo.save(shortcut);
  }

  async patchShortcut(id: number, dto: CreateShortcutDto) {
    const shortcut = await this.shortcutRepo.findOneBy({ id: id });
    if (!shortcut) {
      throw new ShortcutNotFoundException('Not found the shortcut');
    }

    this.shortcutRepo.merge(shortcut, dto);
    return await this.shortcutRepo.save(shortcut);
  }

  async deleteShortcut(id: number) {
    const shortcut = await this.shortcutRepo.findOneBy({ id: id });
    if (!shortcut) {
      throw new ShortcutNotFoundException('Not found the shortcut');
    }
    await this.shortcutRepo.remove(shortcut);
  }

  async findShortcut(id: number) {
    const shortcut = await this.shortcutRepo.findOneBy({ id: id });
    if (!shortcut) {
      throw new ShortcutNotFoundException('Not found the shortcut');
    }
    return shortcut;
  }

  async findShortcutList(dto: FindShortCutsDto) {
    let query = this.shortcutRepo.createQueryBuilder('shortcut');
    if (dto.id) query = query.where('shortcut.id = :id', { id: dto.id });
    if (dto.creatorId)
      query = query.where('shortcut.creatorId = :creatorId', {
        creatorId: dto.creatorId,
      });
    if (dto.title)
      query = query.where('shortcut.title = :title', { title: dto.title });
    return await query.getMany();
  }
}
