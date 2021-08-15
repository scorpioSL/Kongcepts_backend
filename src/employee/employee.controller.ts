import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { Employee } from 'src/database/schemas/employee.schema';
import { EmployeeResponseDto } from 'src/shared/dto/employee-response.dto';
import { EmployeeDto } from 'src/shared/dto/employee.dto';
import { catchError } from 'src/shared/error-handling/catch-error';
import { IBaseController } from 'src/shared/interfaces/base.controller.interface';
import { QueryOrderType } from 'src/shared/types/query-order.types';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController implements IBaseController<EmployeeDto>{
  constructor(private readonly employeeService: EmployeeService) {
    // do nothing
  }

  // Guard did not add since need to create employee first
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

  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  public async find(@Res() res: Response, @Param('id') id: string) {
    try {
      const employee: EmployeeResponseDto = await this.employeeService.find(id);
      return res.status(HttpStatus.OK).json(employee);
    } catch (error) {
      catchError(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  public async remove(@Res() res: Response, @Param('id') id: string): Promise<Response> {
    try {
      const employee: EmployeeResponseDto = await this.employeeService.remove(id);
      return res.status(HttpStatus.OK).json(employee);
    } catch (error) {
      catchError(res, error);
    }
  }
}
