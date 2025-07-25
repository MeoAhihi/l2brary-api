// src/entities/activity-log.entity.ts

import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  Index,
  ObjectId,
} from 'typeorm';
import { ActivityEventType } from './types/activity-log.types';

/**
 * Represents a single recorded action taken by a member.
 * This collection acts as an immutable log for engagement tracking and analytics.
 */
@Entity('activity_logs')
export class ActivityLog {
  @ObjectIdColumn()
  _id: ObjectId;

  /**
   * The ID of the member who performed the action.
   * Indexed for efficient querying of a member's activity history.
   */
  @Index()
  @Column()
  memberId: ObjectId;

  /**
   * The type of event that occurred. Uses a predefined enum for consistency.
   */
  @Column({
    type: 'enum',
    enum: ActivityEventType,
  })
  eventType: ActivityEventType;

  /**
   * A flexible object to store context-specific data about the event.
   * e.g., { classId: '...', score: 95 }
   */
  @Column('simple-json')
  details: object;

  /**
   * The timestamp of when the event occurred.
   * Using CreateDateColumn automatically sets this on creation.
   */
  @CreateDateColumn()
  timestamp: Date;
}
