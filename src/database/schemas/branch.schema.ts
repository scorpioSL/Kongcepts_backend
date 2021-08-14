import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Bank } from './bank.schema';
import { transform as bankTransform, BankDocument } from './bank.schema';

export type BranchDocument = Branch & Document;

@Schema()
export class Branch {
  @Prop()
  branch_id: string;

  @Prop()
  branch_name: string;

  @Prop()
  branch_address: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Bank' })
  bank: Bank;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);

export function transform(document: BranchDocument): Branch {
  const branch: Branch = new Branch();
  branch.branch_id = document._id;
  branch.branch_name = document.branch_name;
  branch.branch_address = document.branch_address;
  if (document.bank) {
    branch.bank = bankTransform(document.bank as BankDocument);
  }
  return branch;
}
