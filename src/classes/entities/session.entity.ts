import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type SessionDocument = HydratedDocument<Session>;

@Schema()
export class Session {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  class_id: ObjectId;

  @Prop({ required: true })
  class_name: string;

  @Prop({ required: true })
  started_at: Date;

  @Prop()
  ended_at: Date;

  @Prop()
  talker_fullname: string;

  @Prop()
  general_score: number;

  @Prop()
  active_score: number;

  @Prop()
  academic_score: number;

  @Prop()
  smile_score: number;

  @Prop()
  attendances: {
    member_id: ObjectId;
    fullname: string;
    joined_at: Date;
  }[];

  @Prop()
  quiz_completes: {
    member_id: ObjectId;
    score: number;
  }[];
}

export const SessionSchema = SchemaFactory.createForClass(Session);
