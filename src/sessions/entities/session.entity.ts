import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export interface Attendance {
  member_id: ObjectId;
  fullname: string;
  joined_at: Date;
}

export interface QuizComplete {
  member_id: ObjectId;
  score: number;
}

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

  @Prop({ type: Array<Attendance> })
  attendances: Attendance[];

  @Prop({ type: Array<QuizComplete> })
  quiz_completes: QuizComplete[];
}

export const SessionSchema = SchemaFactory.createForClass(Session);
