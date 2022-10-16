import { NotAcceptableException, NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super(error, 'error.userNotFound');
  }
}

export class PasswordIncorrectException extends NotAcceptableException {
  constructor(error?: string) {
    super(error, 'error.passwordIncorrect');
  }
}
