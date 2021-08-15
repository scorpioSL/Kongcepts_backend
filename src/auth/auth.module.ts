import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/shared/constants/jwt.constant';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { MongooseModule } from '@nestjs/mongoose';
import { Bank, BankSchema } from 'src/database/schemas/bank.schema';
import { Branch, BranchSchema } from 'src/database/schemas/branch.schema';
import { Employee, EmployeeSchema } from 'src/database/schemas/employee.schema';
import { BankService } from 'src/bank/bank.service';
import { BranchService } from 'src/branch/branch.service';
import { EmployeeService } from 'src/employee/employee.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1 day' },
    }),
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: Branch.name, schema: BranchSchema },
      { name: Bank.name, schema: BankSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, EmployeeService, BranchService, BankService],
  exports: [JwtStrategy, JwtAuthGuard],
})
export class AuthModule { }
