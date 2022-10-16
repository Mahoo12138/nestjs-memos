import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Response,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { TransformInterceptor } from 'src/common/transform.interceptor';
import { SessionGuard } from '../auth/session.auth.guard';
import { SessionUser } from '../user/common/user.decorator';
import { User } from '../user/common/user.entity';
import { FileNotFoundException } from './file.exception';
import { FileService } from './file.service';

@Controller()
export class FileController {
  constructor(private fileService: FileService) {}
  @UseInterceptors(TransformInterceptor)
  @Get('/api/resource')
  async getAllFiles() {
    return await this.fileService.findFilesList();
  }

  @UseInterceptors(TransformInterceptor)
  @UseGuards(SessionGuard)
  @Delete('/api/resource/:id')
  async deleteFile(@Param('id') id: number) {
    await this.fileService.deleteFile(id);
  }

  @UseInterceptors(TransformInterceptor)
  @UseGuards(SessionGuard)
  @Post('/api/resource')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @SessionUser() user: User,
  ) {
    return await this.fileService.createFile(user, file);
  }

  @Get('/o/r/:id/:filename')
  async getFile(
    @Param('id') id: number,
    @Param('filename') filename: string,
    @Response({ passthrough: true }) res,
  ): Promise<StreamableFile> {
    const fileInfo = await this.fileService.findFile(id);
    const filePath = join(fileInfo.destination, fileInfo.destname);
    if (existsSync(filePath)) {
      const file = createReadStream(filePath);
      res.set({
        'Content-Type': fileInfo.type,
        'Content-Disposition': `attachment; filename="${filename}"`,
      });
      return new StreamableFile(file);
    }
    throw new FileNotFoundException('The file has been lost.');
  }
}
