import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as multer from 'multer';
import { exitsFolder } from 'src/utils/dir';
import { FileController } from './file.controller';
import { File } from './file.entity';
import { FileService } from './file.service';

@Module({})
export class FileModule {
  static forRoot(): DynamicModule {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(
          null,
          '/data/data/com.termux/files/home/workbench/nest-memos/memos-uploads',
        );
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
      },
    });
    return {
      module: FileModule,
      controllers: [FileController],
      providers: [FileService],
      imports: [
        MulterModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            storage: multer.diskStorage({
              destination: async function (req, file, cb) {
                cb(
                  null,
                  await exitsFolder(configService.get('memos.uploadPath')),
                );
              },
              filename: function (req, file, cb) {
                const uniqueSuffix =
                  Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, file.fieldname + '-' + uniqueSuffix);
              },
            }),
          }),
          inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([File], 'memos'),
      ],
    };
  }
}
