import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId, Query } from 'mongoose';
import { ClassGroup } from '../../class-groups/entities/class_group.entity';

export type ClassDocument = HydratedDocument<Class>;

@Schema({ timestamps: true })
export class Class {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({
    type: String,
    enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
  })
  day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

  @Prop({
    type: String,
    enum: ['weekly', 'monthly', 'op2w', 'oddWk', 'evenWk'],
  })
  frequency: 'weekly' | 'monthly' | 'op2w' | 'oddWk' | 'evenWk';

  @Prop({ match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ })
  start_at: string;

  @Prop({ match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ })
  end_at: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'ClassGroup' })
  class_group: ClassGroup;

  @Prop()
  class_members: {
    member_id: ObjectId;
    group: string;
    position: string;
  }[];

  @Prop()
  avatar_url: string;

  @Prop()
  message_group_url: string;

  @Prop()
  deleted_at: Date;
}

const ClassSchema = SchemaFactory.createForClass(Class);

ClassSchema.pre<Query<any, any>>(/^find/, function (next) {
  this.where({ deleted_at: null });
  next();
});

export { ClassSchema };
