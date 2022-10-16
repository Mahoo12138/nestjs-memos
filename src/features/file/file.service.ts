import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';
import { awaitWrap } from 'src/utils/async';
import { checkFileHash, deleteFile } from 'src/utils/dir';
import { Repository } from 'typeorm';
import { User } from '../user/common/user.entity';
import { File } from './file.entity';
import { FileNotFoundException } from './file.exception';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File, 'memos') private fileRepo: Repository<File>,
  ) {}
  async createFile(user: User, rawFile: Express.Multer.File) {
    const filePath = join(rawFile.destination, rawFile.filename);
    const [err, md5] = await awaitWrap(checkFileHash(filePath));
    if (err) throw err;
    let existFile = await this.findFileByMd5(md5);
    if (existFile) {
      delete existFile.id;
      existFile.linkedMemoAmount++;
      deleteFile(filePath);
    } else {
      existFile = this.fileRepo.create({
        type: rawFile.mimetype,
        size: rawFile.size,
        destname: rawFile.filename,
        destination: rawFile.destination,
      });
    }
    Object.assign(existFile, {
      ...existFile,
      creatorId: user,
      filename: rawFile.originalname,
      hash: md5,
    });
    const file = await this.fileRepo.save(existFile);
    const { destination, destname, ...result } = file;
    return result;
  }

  async findFile(id: number) {
    const file = await this.fileRepo.findOne({
      where: { id: id },
      select: { destination: true, destname: true, type: true },
    });
    if (file) return file;
    throw new FileNotFoundException('Can not find the file.');
  }

  async findFileByMd5(md5: string) {
    return await this.fileRepo.findOne({
      where: { hash: md5 },
      select: {
        destination: true,
        destname: true,
        type: true,
        size: true,
        linkedMemoAmount: true,
      },
    });
  }

  async deleteFile(id: number) {
    const file = await this.fileRepo.findOneBy({ id: id });
    if (!file) {
      throw new FileNotFoundException('Not found the file');
    }
    // await this.fileRepo
    //     .createQueryBuilder('file')
    //     .relation('linkedMemos')
    //     .of(file)
    //     .remove()
    await this.fileRepo.remove(file);
  }

  async findFilesList() {
    return await this.fileRepo.find();
  }
}
