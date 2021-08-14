import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Bank,
  BankDocument,
  transform,
} from 'src/database/schemas/bank.schema';
import { BankDto } from 'src/shared/dto/bank.dto';
import { QueryOrderType } from 'src/shared/types/query-order.types';
import { BankNotFoundException } from './exceptions/bank-not-found.exception';

@Injectable()
export class BankService {
  constructor(@InjectModel(Bank.name) private bankModel: Model<BankDocument>) {}

  public async create(bankDto: BankDto): Promise<Bank> {
    try {
      let bankDocument: BankDocument = null;
      if (bankDto.bank_id) {
        bankDocument = await this.bankModel.findOneAndUpdate(
          { _id: bankDto.bank_id },
          bankDto,
          { new: true },
        );
      } else {
        bankDocument = new this.bankModel(bankDto);
        await bankDocument.save();
      }
      return transform(bankDocument);
    } catch (error) {
      throw error;
    }
  }

  public async find(id: string): Promise<Bank> {
    const bankDocument: BankDocument = await this.bankModel.findById(id).exec();
    if (!bankDocument) {
      throw new BankNotFoundException(id);
    }
    return transform(bankDocument);
  }

  public async query(
    limit?: number,
    offset?: number,
    order?: QueryOrderType,
  ): Promise<Array<Bank>> {
    try {
      const bankDocumentList: Array<BankDocument> = await this.bankModel
        .find()
        .limit(limit ? limit : 10)
        .skip(offset ? offset : 0)
        .sort({ _id: order === 'ASC' ? 1 : -1 })
        .exec();

      const bankList: Bank[] = bankDocumentList.map((document: BankDocument) =>
        transform(document),
      );
      return bankList;
    } catch (error) {
      throw error;
    }
  }

  public async remove(id: string): Promise<Bank> {
    try {
      const bankDocument: BankDocument = await this.bankModel
        .findOneAndDelete({ _id: id })
        .exec();
      return transform(bankDocument);
    } catch (error) {
      throw error;
    }
  }
}
