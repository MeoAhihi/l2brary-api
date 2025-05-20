import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
})
export class Member {
  @Prop({ required: true })
  fullName: string;

  @Prop()
  birthday: Date;

  @Prop()
  isMale: boolean;

  @Prop()
  schoolClass: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: string;

  @Prop()
  avatar_url: string;
}

export type MemberDocument = HydratedDocument<Member>;
export const MemberSchema = SchemaFactory.createForClass(Member);