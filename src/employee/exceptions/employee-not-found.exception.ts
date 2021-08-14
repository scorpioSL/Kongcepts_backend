import { NotFoundException } from '@nestjs/common';

export class EmployeeNotFoundException extends NotFoundException {
  private emp_id: string;

  constructor(id: string) {
    super();
    super.message = 'Employee not found!';
    this.emp_id = id;
  }
}
