import { ForbiddenException } from '@nestjs/common';

export class EmployeeForbiddenException extends ForbiddenException {
  constructor(msg: string) {
    super();
    this.message = msg;
  }
}
