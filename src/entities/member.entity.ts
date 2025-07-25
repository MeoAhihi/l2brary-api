import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectId,
  DeleteDateColumn,
} from 'typeorm';
import { NotificationPreferences } from './types/notification-preferences.type';

/**
 * Represents a member of the L2brary club. This is the central document
 * for user identity, authentication, and profile information.
 */
@Entity('members')
export class Member {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  fullName: string;

  @Column()
  internationalName: string;

  @Column({ unique: true })
  email: string;

  /**
   * The hashed password. Use `select: false` so it's not returned in queries by default.
   * Hashing should be handled in the service layer before saving.
   */
  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ type: 'string', array: true, default: [] })
  interests: string[];

  /**
   * An array of ObjectIds referencing the Role collection.
   * This defines the member's permissions.
   */
  @Column({ type: 'string', array: true, default: [] })
  roleIds: ObjectId[];

  /**
   * An array of ObjectIds referencing the Group collection.
   * This defines which social/project groups the member belongs to.
   */
  @Column({ type: 'string', array: true, default: [] })
  groupIds: ObjectId[];

  /**
   * Embedded object for managing user's notification preferences.
   */
  @Column(() => NotificationPreferences)
  notificationPreferences: NotificationPreferences;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
