import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { File } from '../file/file.entity';
import { User } from '../user/common/user.entity';
import { CreateMemoDto, FindMemosDto, PatchMemoDto } from './common/memo.dto';
import { MemoNotFoundException } from './common/memo.exception';
import { Memo } from './common/memo.entity';
import { MemoFile } from './common/memo-file.entity';

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(Memo, 'memos') private memoRepo: Repository<Memo>,
    @InjectRepository(User, 'memos') private userRepo: Repository<User>,
    @InjectRepository(File, 'memos') private fileRepo: Repository<File>,
    @InjectRepository(MemoFile, 'memos')
    private memoFileRepo: Repository<MemoFile>,
  ) {}

  async createMemo(dto: CreateMemoDto) {
    let files: File[] = [];
    if (dto.resourceIdList && dto.resourceIdList.length !== 0) {
      files = await this.fileRepo.find({
        where: { id: In(dto.resourceIdList) },
      });
    }
    const user = await this.userRepo.findOneBy({ id: dto.creatorId });
    const rawMemo = this.memoRepo.create({ ...dto, creatorId: user });
    const memo = await this.memoRepo.save(rawMemo);
    await this.bindMemoResourceList(memo.id, files);
    return this.composeMemoResourceList(memo, dto.resourceIdList);
  }

  async patchMemo(id: number, dto: PatchMemoDto) {
    let files: File[] = [];
    if (dto.resourceIdList && dto.resourceIdList.length !== 0) {
      files = await this.fileRepo.find({
        where: { id: In(dto.resourceIdList) },
      });
    }
    const memo = await this.memoRepo.findOneBy({ id: id });
    if (!memo) {
      throw new MemoNotFoundException('Not found the memo');
    }

    this.memoRepo.merge(memo, { ...dto, resourceList: files });
    return await this.memoRepo.save(memo);
  }

  async deleteMemo(id: number) {
    const memo = await this.memoRepo.findOneBy({ id: id });
    if (!memo) {
      throw new MemoNotFoundException('Not found the memo');
    }
    await this.memoRepo.remove(memo);
  }

  async findMemoList(dto: FindMemosDto) {
    let query = this.memoRepo
      .createQueryBuilder('memo')
      .loadAllRelationIds({ relations: ['creatorId'] });

    // .leftJoinAndSelect("memo.resourceList", "resourceList")
    // .select('user')
    // .addSelect('user')
    // .innerJoin("memo.creatorId", "user")
    // .leftJoinAndSelect(User, 'user', "user.id = memo.creatorId");
    if (dto.visibilityList.length !== 0) {
      query = query.where('memo.visibility IN (:...list)', {
        list: dto.visibilityList,
      });
    }
    if (dto.creatorId) {
      query = query.andWhere('memo.creatorId = :creatorId', {
        creatorId: dto.creatorId,
      });
    }
    if (dto.rowStatus) {
      query = query.andWhere('memo.rowStatus = :rowStatus', {
        rowStatus: dto.rowStatus,
      });
    }

    const memos = await query.getMany();
    return await this.mapComposeMemoResourceList(memos);
  }

  async bindMemoResourceList(memoId: number, files: File[]) {
    if (files.length === 0) return;
    files.forEach(async (file) => {
      const memoFile = this.memoFileRepo.create({ memoId, fileId: file.id });
      await this.memoFileRepo.save(memoFile);
    });
  }

  async mapComposeMemoResourceList(memos: Memo[]) {
    return await Promise.all(
      memos.map(async (memo) => await this.composeMemoResourceList(memo)),
    );
  }
  async composeMemoResourceList(memo: Memo, resourceIdList: number[] = []) {
    const memoFiles = await this.memoFileRepo.find({
      where: { memoId: memo.id },
    });
    const files = await this.fileRepo.find({
      where: { id: In([...memoFiles.map((m) => m.fileId), ...resourceIdList]) },
    });
    memo.resourceList = [...files];
    return memo;
  }
}
