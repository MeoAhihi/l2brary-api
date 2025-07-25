import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Jane Doe', description: "Member's name" })
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'jane.doe@example.com', description: "Member's email (must be unique)" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Str0ngP@ssw0rd!', description: 'Password (at least 8 characters)' })
  @IsString()
  @MinLength(8)
  password: string;
}