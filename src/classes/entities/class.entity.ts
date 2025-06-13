import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type ClassDocument = HydratedDocument<Class>;

@Schema({ timestamps: true })
export class Class {
  @Prop({ required: true })
  name: string;

  @Prop()
  day: string;

  @Prop()
  frequency: string;

  @Prop()
  start_time: string;

  @Prop()
  end_time: string;

  @Prop()
  class_group: {
    class_group_id: ObjectId;
    name: string;
  };

  @Prop()
  class_members: {
    member_id: ObjectId;
    group: string;
    position: string;
  }[];
}

export const ClassSchema = SchemaFactory.createForClass(Class);