import { ForbiddenException } from '@nestjs/common';

export class BranchForbiddenException extends ForbiddenException {
  constructor(msg: string) {
    super();
    this.message = msg;
  }
}
