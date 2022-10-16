import { NotAcceptableException } from '@nestjs/common';

export class UserAlreadySignException extends NotAcceptableException {
  constructor(error?: string) {
    super('error.userAlreadySign', error);
  }
}
