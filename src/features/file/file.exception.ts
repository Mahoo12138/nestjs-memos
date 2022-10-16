import { NotFoundException } from '@nestjs/common';

export class FileNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message, 'error.FileNotFound');
  }
}
