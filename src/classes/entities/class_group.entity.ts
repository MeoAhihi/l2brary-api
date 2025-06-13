import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClassGroupDocument = HydratedDocument<ClassGroup>;

@Schema()
export class ClassGroup {
  @Prop({ required: true })
  name: string;
}

export const ClassGroupSchema = SchemaFactory.createForClass(ClassGroup);
