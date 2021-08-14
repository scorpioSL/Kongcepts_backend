import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BankDto {
  @IsOptional()
  @IsString()
  bank_id: string;

  @IsNotEmpty()
  @IsString()
  bank_name: string;
}
