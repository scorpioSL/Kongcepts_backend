import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { EmployeeResponseDto } from 'src/shared/dto/employee-response.dto';
import { EmployeeDto } from 'src/shared/dto/employee.dto';
import { catchError } from 'src/shared/error-handling/catch-error';
import { QueryOrderType } from 'src/shared/types/query-order.types';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {
    // do nothing
  }

  @Post('create')
  public async create(@Res() res: Response, @Body() employeeDto: EmployeeDto) {
    try {
      const employee: EmployeeResponseDto = await this.employeeService.create(
        employeeDto,
      );
      return res.status(HttpStatus.OK).json(employee);
    } catch (error) {
      catchError(res, error);
    }
  }

  @Get('find/:id')
  public async find(@Res() res: Response, @Param('id') id: string) {
    try {
      const employee: EmployeeResponseDto = await this.employeeService.find(id);
      return res.status(HttpStatus.OK).json(employee);
    } catch (error) {
      catchError(res, error);
    }
  }

  @Get('query')
  public async query(
    @Res() res: Response,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('order') order?: QueryOrderType,
  ) {
    try {
      const employeeList: EmployeeResponseDto[] =
        await this.employeeService.query(limit, offset, order);
      return res.status(HttpStatus.OK).json(employeeList);
    } catch (error) {
      catchError(res, error);
    }
  }
}
