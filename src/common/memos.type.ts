import { DatabaseType, DataSourceOptions } from 'typeorm';

export interface MemosModuleOptions {
  hostName: string;
  hostEmail: string;
  hostPassword: string;
  database: DataSourceOptions;
}

export interface MemosModuleConfig
  extends Pick<MemosModuleOptions, 'hostName' | 'hostEmail' | 'hostPassword'> {
  readonly type: DatabaseType;
  readonly logger: boolean;
  readonly sync?: boolean;

  readonly path?: string;

  readonly host?: string;
  readonly port?: number;

  readonly username?: string;
  readonly password?: string;
  readonly database?: string;

  readonly uploadPath: string;
}
