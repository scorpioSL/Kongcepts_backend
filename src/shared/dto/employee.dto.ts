import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BranchDto } from './branch.dto';

export class EmployeeDto {
  @IsOptional()
  @IsString()
  emp_id: string;

  @IsNotEmpty()
  @IsString()
  emp_name: string;

  @IsNotEmpty()
  @IsString()
  emp_email: string;

  @IsOptional()
  @IsString()
  emp_photo: string;

  @IsOptional()
  @IsString()
  emp_address: string;

  @IsNotEmpty()
  @IsString()
  emp_password: string;

  @IsOptional()
  branch?: BranchDto;
}
