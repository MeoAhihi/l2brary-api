import { ObjectId } from "mongoose";

export class CreateSessionDto {
  title: string;

  class_id: ObjectId;

  started_at: Date;

}
