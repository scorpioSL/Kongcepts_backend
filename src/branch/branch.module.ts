import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BankService } from 'src/bank/bank.service';
import { Bank, BankSchema } from 'src/database/schemas/bank.schema';
import { Branch, BranchSchema } from 'src/database/schemas/branch.schema';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Branch.name,
        schema: BranchSchema,
      },
      {
        name: Bank.name,
        schema: BankSchema,
      },
    ]),
  ],
  controllers: [BranchController],
  providers: [BranchService, BankService],
})
export class BranchModule {}
