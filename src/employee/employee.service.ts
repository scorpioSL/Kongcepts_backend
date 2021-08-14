import { Injectable } from '@nestjs/common';
import { QueryOrderType } from 'src/shared/types/query-order.types';
import { EmployeeDto } from 'src/shared/dto/employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Employee,
  EmployeeDocument,
  transform,
} from 'src/database/schemas/employee.schema';
import { Model, Types } from 'mongoose';
import { Branch } from 'src/database/schemas/branch.schema';
import { EmployeeResponseDto } from 'src/shared/dto/employee-response.dto';
import { BranchService } from 'src/branch/branch.service';
import { EmployeeForbiddenException } from './exceptions/employee-forbidden.exception';
import { EmployeeNotFoundException } from './exceptions/employee-not-found.exception';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    private branchService: BranchService,
  ) {
    // do nothing
  }

  public async create(employeeDto: EmployeeDto): Promise<EmployeeResponseDto> {
    try {
      if (!employeeDto.branch) {
        throw new EmployeeForbiddenException('Branch must be provided!');
      }

      let employeeDocument: EmployeeDocument = null;
      const branch: Branch = await this.branchService.find(
        employeeDto.branch.branch_id,
      );
      if (employeeDto.emp_id) {
        employeeDocument = await this.employeeModel.findOneAndUpdate(
          {
            _id: employeeDto.emp_id,
          },
          {
            emp_name: employeeDto.emp_name,
            emp_email: employeeDto.emp_email,
            emp_photo: employeeDto.emp_photo,
            emp_address: employeeDto.emp_address,
            branch: branch,
          },
          {
            new: true,
          },
        );
      } else {
        employeeDocument = new this.employeeModel({
          ...employeeDto,
          branch: Types.ObjectId(branch.branch_id),
        });
        await employeeDocument.save();
      }
      const employee: EmployeeResponseDto = transform(employeeDocument);
      return employee;
    } catch (error) {
      throw error;
    }
  }

  public async find(id: string): Promise<EmployeeResponseDto> {
    try {
      const employeeDocument: EmployeeDocument = await this.employeeModel
        .findById(id)
        .populate({ path: 'branch', populate: { path: 'bank' } })
        .exec();
      if (!employeeDocument) {
        throw new EmployeeNotFoundException(id);
      }
      const employee: EmployeeResponseDto = transform(employeeDocument);
      return employee;
    } catch (error) {
      throw error;
    }
  }

  public async query(
    limit?: number,
    offset?: number,
    order?: QueryOrderType,
  ): Promise<EmployeeResponseDto[]> {
    try {
      const employeeDocumentList: EmployeeDocument[] = await this.employeeModel
        .find()
        .populate({ path: 'branch', populate: { path: 'bank' } })
        .limit(limit ? limit : 10)
        .skip(offset ? offset : 0)
        .sort({ _id: order === 'ASC' ? 1 : -1 })
        .exec();
      const employeeList: EmployeeResponseDto[] = employeeDocumentList.map(
        (doc: EmployeeDocument) => transform(doc),
      );
      return employeeList;
    } catch (error) {
      throw error;
    }
  }
}
