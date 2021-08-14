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
import { BankService } from './bank.service';
import { Response } from 'express';
import { BankDto } from 'src/shared/dto/bank.dto';
import { QueryOrderType } from 'src/shared/types/query-order.types';
import { catchError } from 'src/shared/error-handling/catch-error';
import { Bank } from 'src/database/schemas/bank.schema';

@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {
    // do nothing
  }

  @Post('create')
  public async create(
    @Res() res: Response,
    @Body() bankDto: BankDto,
  ): Promise<Response> {
    try {
      const bank: Bank = await this.bankService.create(bankDto);
      return res.status(HttpStatus.OK).json(bank);
    } catch (error) {
      catchError(res, error);
    }
  }

  @Get('find/:id')
  public async find(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    try {
      const bank: Bank = await this.bankService.find(id);
      return res.status(HttpStatus.OK).json(bank);
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
  ): Promise<Response> {
    try {
      const bankList: Array<Bank> = await this.bankService.query(
        limit,
        offset,
        order,
      );
      return res.status(HttpStatus.OK).json(bankList);
    } catch (error) {
      catchError(res, error);
    }
  }

  @Delete('delete/:id')
  public async remove(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    try {
      const bank: Bank = await this.bankService.remove(id);
      return res.status(HttpStatus.OK).json(bank);
    } catch (error) {
      catchError(res, error);
    }
  }
}
