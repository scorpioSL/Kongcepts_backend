import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { EmployeeResponseDto } from 'src/shared/dto/employee-response.dto';
import { Branch } from './branch.schema';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop()
  emp_id: string;

  @Prop()
  emp_name: string;

  @Prop({ unique: true })
  emp_email: string;

  @Prop()
  emp_address: string;

  @Prop()
  emp_photo: string;

  @Prop()
  emp_password: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Branch' })
  branch: Branch;
}

export function transform(document: EmployeeDocument): EmployeeResponseDto {
  const employee: EmployeeResponseDto = new EmployeeResponseDto();
  employee.emp_id = document.id;
  employee.emp_name = document.emp_name;
  employee.emp_email = document.emp_email;
  employee.emp_address = document.emp_address;
  employee.emp_photo = document.emp_photo;
  if (document.branch) {
    const branch: Branch = document.get('branch');
    employee.branch_name = branch.branch_name;
    if (branch.bank) {
      employee.bank_name = branch.bank.bank_name;
    }
  }
  return employee;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
