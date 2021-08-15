import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  Employee,
  EmployeeDocument,
} from 'src/database/schemas/employee.schema';
import { EmployeeService } from 'src/employee/employee.service';
import { LoginDto } from 'src/shared/dto/login.dto';
import { compareHash } from 'src/shared/utill/hashing.utill';
import { InvalidBadRequestException } from './exceptions/auth-invalid-badrequest.exception';
import { Request } from 'express';
import { AuthUnauthorizedException } from './exceptions/auth-unauthorized.exception';
import { EmployeeResponseDto } from 'src/shared/dto/employee-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly employeeService: EmployeeService,
  ) {
    // do nothing
  }

  private async validateEmployee(
    email: string,
    password: string,
  ): Promise<EmployeeDocument | null> {
    const employeeDocument: EmployeeDocument =
      await this.employeeService.findByEmail(email);
    if (
      employeeDocument &&
      (await compareHash(password, employeeDocument.emp_password))
    ) {
      return employeeDocument;
    }
    return null;
  }

  async login(body: LoginDto): Promise<string> {
    const employee: EmployeeDocument = await this.validateEmployee(
      body.email,
      body.password,
    );

    if (!employee) {
      throw new InvalidBadRequestException(body.email, 'Invalid credentials');
    }

    const payload = {
      employee: {
        emp_id: employee._id,
        email: employee.emp_email,
      },
    };

    return this.jwtService.sign(payload);
  }

  async whoAmI(req: Request): Promise<EmployeeResponseDto> {
    const payload: any = req.user;

    if (!payload) {
      throw new AuthUnauthorizedException('Unauthorized!');
    }

    const employee: EmployeeResponseDto = await this.employeeService.find(
      payload.emp_id,
    );

    if (!employee) {
      throw new UnauthorizedException('Unauthorized!');
    }

    return employee;
  }
}
