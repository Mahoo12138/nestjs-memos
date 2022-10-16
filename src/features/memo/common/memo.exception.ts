import { NotFoundException } from '@nestjs/common';

export class MemoNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.memoNotFound', error);
  }
}
