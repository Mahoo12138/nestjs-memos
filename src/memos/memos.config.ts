import { registerAs } from '@nestjs/config';
import { MemosModuleConfig } from 'src/common/memos.type';
import { DatabaseType } from 'typeorm';

export default registerAs<MemosModuleConfig>('memos', () => ({
  hostName: process.env.MEMOS_NAME,
  hostEmail: process.env.MEMOS_EMAIL,
  hostPassword: process.env.MEMOS_PASSWD,
  logger: !!process.env.MEMOS_DB_LOG || false,
  sync: !!process.env.MEMOS_DB_SYNC || false,
  type: process.env.MEMOS_DB_TYPE as DatabaseType,
  // mysql or other
  host: process.env.MEMOS_DB_HOST || 'localhost',
  port: parseInt(process.env.MEMOS_DB_PROT, 10) || 3000,
  username: process.env.MEMOS_BD_USERNAME,
  password: process.env.MEMOS_BD_PASSWORD,
  database: process.env.MEMOS_BD_DATABASE,
  // sqlite
  path: process.env.MEMOS_DB_PATH,
  // upload
  uploadPath: process.env.MEMOS_UPLOAD_PATH,
}));
