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
import { BranchService } from './branch.service';
import { Response } from 'express';
import { BranchDto } from 'src/shared/dto/branch.dto';
import { QueryOrderType } from 'src/shared/types/query-order.types';
import { Branch } from 'src/database/schemas/branch.schema';
import { catchError } from 'src/shared/error-handling/catch-error';
import { IBaseController } from 'src/shared/interfaces/base.controller.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@Controller('branch')
export class BranchController implements IBaseController<BranchDto> {
  constructor(private readonly branchService: BranchService) { }

  @Post('create')
  public async create(@Res() res: Response, @Body() branchDtp: BranchDto) {
    try {
      const branch: Branch = await this.branchService.create(branchDtp);
      return res.status(HttpStatus.OK).json(branch);
    } catch (error) {
      catchError(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  public async find(@Res() res: Response, @Param('id') id: string) {
    try {
      const branch: Branch = await this.branchService.find(id);
      return res.status(HttpStatus.OK).json(branch);
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

  @UseGuards(JwtAuthGuard)
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
