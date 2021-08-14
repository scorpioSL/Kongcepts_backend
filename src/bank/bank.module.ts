import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bank, BankSchema } from 'src/database/schemas/bank.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bank.name, schema: BankSchema }]),
  ],
  providers: [BankService],
  controllers: [BankController],
})
export class BankModule {}
