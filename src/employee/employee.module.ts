import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Branch, BranchSchema } from 'src/database/schemas/branch.schema';
import { Bank, BankSchema } from 'src/database/schemas/bank.schema';
import { Employee, EmployeeSchema } from 'src/database/schemas/employee.schema';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { BranchService } from 'src/branch/branch.service';
import { BankService } from 'src/bank/bank.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: Branch.name, schema: BranchSchema },
      { name: Bank.name, schema: BankSchema },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, BranchService, BankService],
})
export class EmployeeModule {}
