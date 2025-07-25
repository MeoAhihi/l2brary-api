// src/engagement-tracking/dto/log-activity.dto.ts
import { IsEnum, IsMongoId, IsObject, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongodb';
import { ActivityEventType } from 'src/entities/types/activity-log.types';

export class LogActivityDto {
  @IsMongoId()
  @IsNotEmpty()
  memberId: ObjectId;

  @IsEnum(ActivityEventType)
  @IsNotEmpty()
  eventType: ActivityEventType;

  /**
   * A flexible object for context-specific data.
   * e.g., { classId: '...', score: 95 }
   */
  @IsObject()
  details: object;
}
