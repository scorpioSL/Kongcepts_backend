import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BankDocument = Bank & Document;

@Schema()
export class Bank {
  @Prop()
  bank_id: string;

  @Prop({ unique: true })
  bank_name: string;
}

export const BankSchema = SchemaFactory.createForClass(Bank);

export function transform(document: BankDocument): Bank {
  const bank = new Bank();
  bank.bank_id = document._id;
  bank.bank_name = document.bank_name;
  return bank;
}
