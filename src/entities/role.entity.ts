import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn, ObjectId } from 'typeorm';

/**
 * Represents a Role within the club (e.g., Member, Mentor, Admin).
 * Roles are used by the Auth module to determine permissions.
 */
@Entity('roles')
export class Role {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  /**
   * List of permission strings granted to this role.
   * e.g., ['create:blog', 'manage:members']
   */
  @Column({ type: 'string', array: true, default: [] })
  permissions: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}