import { NotFoundException } from '@nestjs/common';

export class ShortcutNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.shortcutNotFound', error);
  }
}
