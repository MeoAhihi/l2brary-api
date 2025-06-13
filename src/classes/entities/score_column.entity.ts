import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type ScoreColumnDocument = HydratedDocument<ScoreColumn>;

@Schema()
export class ScoreColumn {
  @Prop({ required: true })
  name: string;

  @Prop()
  category: string;

  @Prop({ required: true })
  class_id: ObjectId;

  @Prop({ default: 1 })
  coefficient: number;

  @Prop({ timestamps: true })
  scores: {
    member_id: ObjectId;
    score: number;
  }[];
}

export const ScoreColumnSchema = SchemaFactory.createForClass(ScoreColumn);
