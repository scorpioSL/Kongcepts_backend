import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BankService } from 'src/bank/bank.service';
import { Bank } from 'src/database/schemas/bank.schema';
import {
  Branch,
  BranchDocument,
  transform,
} from 'src/database/schemas/branch.schema';
import { BranchDto } from 'src/shared/dto/branch.dto';
import { QueryOrderType } from 'src/shared/types/query-order.types';
import { ObjectIdGenerator } from 'src/shared/utill/objectId-generator.utill';
import { BranchForbiddenException } from './exceptions/branch-forbidden.exception';
import { BranchNotFoundException } from './exceptions/branch-not-found.exception';

@Injectable()
export class BranchService {
  constructor(
    @InjectModel(Branch.name) private branchModel: Model<BranchDocument>,
    private readonly bankService: BankService,
  ) {
    // do nothing
  }

  public async create(branchDto: BranchDto): Promise<Branch> {
    if (!branchDto.bank) {
      throw new BranchForbiddenException('Bank must be provided!');
    }

    const bank: Bank = await this.bankService.find(branchDto.bank.bank_id);
    let branchDocument: BranchDocument = null;
    if (branchDto.branch_id) {
      branchDocument = await this.branchModel.findOneAndUpdate(
        { _id: branchDto.branch_id },
        { ...branchDto, bank: bank },
        { new: true },
      );
    } else {
      branchDocument = new this.branchModel({
        ...branchDto,
        bank: ObjectIdGenerator(bank.bank_id),
      });
      await branchDocument.save();
    }

    const branch: Branch = transform(branchDocument);
    return branch;
  }

  public async find(id: string): Promise<Branch> {
    const branchDocument: BranchDocument = await this.branchModel
      .findById(id)
      .exec();
    if (!branchDocument) {
      throw new BranchNotFoundException(id);
    }
    return transform(branchDocument);
  }

  public async query(
    limit?: number,
    offset?: number,
    order?: QueryOrderType,
  ): Promise<Array<Branch>> {
    const branchDocumentList: Array<BranchDocument> = await this.branchModel
      .find()
      .populate('bank')
      .limit(limit ? limit : 10)
      .skip(offset ? offset : 0)
      .sort({ _id: order === 'ASC' ? 1 : -1 })
      .exec();

    const branchList: Branch[] = branchDocumentList.map(
      (document: BranchDocument) => transform(document),
    );
    return branchList;
  }
  public async remove(id: string): Promise<Branch> {
    const branchDocument: BranchDocument = await this.branchModel
      .findOneAndDelete({ _id: id })
      .exec();
    return transform(branchDocument);
  }
}
