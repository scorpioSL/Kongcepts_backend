import { NotFoundException } from '@nestjs/common';

export class BankNotFoundException extends NotFoundException {
  private bank_id: string;
  constructor(id: string) {
    super();
    this.message = 'Bank not found!';
    this.bank_id = id;
  }
}
