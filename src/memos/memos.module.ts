import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemosModuleOptions } from '../common/memos.type';
import { AuthModule } from '../features/auth/auth.module';
import { FileModule } from '../features/file/file.module';
import { Memo } from '../features/memo/common/memo.entity';
import { MemoModule } from '../features/memo/memo.module';
import { Shortcut } from '../features/shortcut/shortcut.entity';
import { ShortcutModule } from '../features/shortcut/shortcut.module';
import { TagModule } from '../features/tag/tag.module';
import { User } from '../features/user/common/user.entity';
import { UserSetting } from '../features/user/common/setting.entity';
import { UserModule } from '../features/user/user.module';
import { MemosController } from './memos.controller';
import { createMemosProviders } from './memos.provider';
import { MemosService } from './memos.service';
import memosConfig from 'src/memos/memos.config';
import { File } from '../features/file/file.entity';
import { MemoFile } from '../features/memo/common/memo-file.entity';
import { isSqlite } from '../utils';

@Module({})
export class MemosModule {
  static register(options: MemosModuleOptions): DynamicModule {
    const imports = [
      AuthModule,
      UserModule,
      MemoModule,
      ShortcutModule,
      TagModule,
    ];
    const services = [MemosService];
    const entities = [User, Memo, Shortcut, MemoFile, UserSetting];
    const providers = [...createMemosProviders(options), ...services];
    return {
      module: MemosModule,
      providers,
      controllers: [MemosController],
      imports: [
        TypeOrmModule.forRoot({
          ...options.database,
          name: 'memos',
          entities,
        }),
        FileModule.forRoot(),
        ...imports,
      ],
      exports: services,
    };
  }
  static forRoot(): DynamicModule {
    const imports = [
      AuthModule,
      UserModule,
      MemoModule,
      ShortcutModule,
      TagModule,
    ];
    const services = [MemosService];
    const entities = [User, Memo, Shortcut, File, MemoFile, UserSetting];
    const providers = [...services];
    return {
      module: MemosModule,
      providers,
      controllers: [MemosController],
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule.forFeature(memosConfig)],
          name: 'memos',
          // @ts-ignore
          useFactory: async (configService: ConfigService) => {
            const type = configService.get('memos.type');
            const datasource = {
              synchronize: configService.get('memos.sync'),
              logging: configService.get('memos.logger'),
              entities,
              type,
            };
            if (isSqlite(type)) {
              return {
                database: configService.get('memos.path'),
                ...datasource,
              };
            } else {
              return {
                host: configService.get('memos.host'),
                port: configService.get('memos.port'),
                database: configService.get('memos.database'),
                username: configService.get('memos.username'),
                password: configService.get('memos.password'),
                ...datasource,
              };
            }
          },
          inject: [ConfigService],
        }),
        FileModule.forRoot(),
        ConfigModule.forFeature(memosConfig),
        ...imports,
      ],
      exports: services,
    };
  }
}
