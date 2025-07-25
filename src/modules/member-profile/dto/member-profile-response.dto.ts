// src/member-profile/dto/member-profile-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { Member } from 'src/entities/member.entity';
import { NotificationPreferences } from 'src/entities/types/notification-preferences.type';
import { ObjectId } from 'typeorm';

export class MemberProfileResponseDto {
  @ApiProperty({
    type: String,
    description: 'The unique identifier of the member',
  })
  _id: ObjectId;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: 'A passionate developer interested in AI.' })
  bio: string;

  @ApiProperty({ type: [String], example: ['AI', 'Python'] })
  interests: string[];

  @ApiProperty({ description: 'Notification settings' })
  notificationPreferences: NotificationPreferences;

  @ApiProperty({
    type: [String],
    description: 'IDs of roles assigned to the member',
  })
  roleIds: ObjectId[];

  @ApiProperty({
    type: [String],
    description: 'IDs of groups the member belongs to',
  })
  groupIds: ObjectId[];

  @ApiProperty()
  createdAt: Date;

  // Static factory method for easy mapping from the entity
  public static fromEntity(entity: Member): MemberProfileResponseDto {
    const dto = new MemberProfileResponseDto();
    dto._id = entity._id;
    dto.email = entity.email;
    dto.firstName = entity.fullName;
    dto.lastName = entity.internationName;
    dto.bio = entity.bio;
    dto.interests = entity.interests;
    dto.notificationPreferences = entity.notificationPreferences;
    dto.roleIds = entity.roleIds;
    dto.groupIds = entity.groupIds;
    dto.createdAt = entity.createdAt;
    return dto;
  }
}
