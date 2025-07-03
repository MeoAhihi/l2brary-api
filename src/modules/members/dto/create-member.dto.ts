import {
  IsString,
  IsOptional,
  IsDateString,
  IsBoolean,
  IsEmail,
} from 'class-validator';

export class CreateMemberDto {
  @IsString()
  fullName: string;

  @IsDateString()
  birthday: Date;

  @IsBoolean()
  is_male: boolean;

  @IsOptional()
  @IsString()
  school_class?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  avatar_url?: string;
}
