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
} from '@nestjs/common';
import { BranchService } from './branch.service';
import { Response } from 'express';
import { BranchDto } from 'src/shared/dto/branch.dto';
import { QueryOrderType } from 'src/shared/types/query-order.types';
import { Branch } from 'src/database/schemas/branch.schema';
import { catchError } from 'src/shared/error-handling/catch-error';

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post('create')
  public async create(@Res() res: Response, @Body() branchDtp: BranchDto) {
    try {
      const branch: Branch = await this.branchService.create(branchDtp);
      return res.status(HttpStatus.OK).json(branch);
    } catch (error) {
      catchError(res, error);
    }
  }

  @Get('find/:id')
  public async find(@Res() res: Response, @Param('id') id: string) {
    try {
      const branch: Branch = await this.branchService.find(id);
      return res.status(HttpStatus.OK).json(branch);
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
      const branchList: Array<Branch> = await this.branchService.query(
        limit,
        offset,
        order,
      );
      return res.status(HttpStatus.OK).json(branchList);
    } catch (error) {
      catchError(res, error);
    }
  }

  @Delete('delete/:id')
  public async remove(@Res() res: Response, @Param('id') id: string) {
    try {
      const branch: Branch = await this.branchService.remove(id);
      return res.status(HttpStatus.OK).json(branch);
    } catch (error) {
      catchError(res, error);
    }
  }
}
