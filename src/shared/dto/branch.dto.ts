import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { BankDto } from './bank.dto';

export class BranchDto {
  @IsOptional()
  @IsString()
  branch_id: string;

  @IsNotEmpty()
  @IsString()
  branch_name: string;

  @IsNotEmpty()
  @IsString()
  branch_address: string;

  @IsNotEmpty()
  bank: BankDto;
}
