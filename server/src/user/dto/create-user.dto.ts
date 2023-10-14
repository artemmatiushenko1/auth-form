import {
  IsString,
  IsEmail,
  MinLength,
  IsInt,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly fullName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly group: string;

  @IsNotEmpty()
  @IsInt()
  readonly variant: number;

  @IsOptional()
  @IsInt()
  readonly role?: Role;
}
