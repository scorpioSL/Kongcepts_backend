import { NotFoundException } from '@nestjs/common';

export class BranchNotFoundException extends NotFoundException {
  private branch_id: string;

  constructor(id: string) {
    super();
    super.message = 'Branch not found!';
    this.branch_id = id;
  }
}
