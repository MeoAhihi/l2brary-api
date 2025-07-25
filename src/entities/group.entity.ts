import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectId,
  DeleteDateColumn,
} from 'typeorm';

/**
 * Represents a social or project-based group within the club.
 * e.g., "AI Research Team", "Beginner's Study Group"
 */
@Entity('groups')
export class Group {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  /**
   * The invitation link to the external Zalo group chat.
   */
  @Column()
  zaloLink: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
