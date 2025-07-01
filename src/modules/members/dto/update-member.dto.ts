import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto } from './create-member.dto';
import { Member } from '../schemas/member.schema';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateMemberDto {
  @IsString()
  fullName?: string;

  @IsDate()
  birthday?: Date;

  @IsBoolean()
  is_male?: boolean;

  @IsString()
  school_class?: string;

  @IsString()
  phone_number?: string;

  @IsEmail()
  email?: string;

  @IsEnum(['admin', 'member', 'monitor'])
  role?: string;

  @IsString()
  @IsOptional()
  avatar_url?: string;
}