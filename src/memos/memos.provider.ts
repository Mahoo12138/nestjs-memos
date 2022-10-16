import { Provider } from '@nestjs/common';

import { MEMOS_OPTIONS } from '../common/memos.constants';
import { MemosModuleOptions } from '../common/memos.type';

export function createMemosProviders(options: MemosModuleOptions): Provider[] {
  return [
    {
      provide: MEMOS_OPTIONS,
      useValue: options,
    },
  ];
}
