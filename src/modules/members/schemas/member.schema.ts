import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { HydratedDocument } from 'mongoose';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Member {
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Prop()
  @IsDate()
  birthday: Date;

  @Prop()
  @IsBoolean()
  @IsNotEmpty()
  is_male: boolean;

  @Prop()
  @IsString()
  @IsOptional()
  school_class: string;

  @Prop()
  @IsString()
  phone_number: string;

  @Prop()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({ default: 'member' })
  @IsEnum(['admin', 'member', 'monitor'])
  role: string;

  @Prop()
  @IsString()
  @IsOptional()
  avatar_url: string;

  @Prop()
  deleted_at: Date;
}

export type MemberDocument = HydratedDocument<Member>;
export const MemberSchema = SchemaFactory.createForClass(Member);
