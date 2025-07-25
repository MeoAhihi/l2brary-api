// src/member-profile/dto/update-member-profile.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { InAppOption } from 'src/entities/types/notification-preferences.type';

class UpdateEmailPreferencesDto {
  @ApiProperty({ description: 'Receive weekly summary emails' })
  @IsOptional()
  @IsBoolean()
  weeklyDigest?: boolean;

  @ApiProperty({
    description: 'Receive instant alerts for important events',
  })
  @IsOptional()
  @IsBoolean()
  instantAlerts?: boolean;
}

class UpdateNotificationPreferencesDto {
  @ApiProperty({ type: UpdateEmailPreferencesDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateEmailPreferencesDto)
  email?: UpdateEmailPreferencesDto;

  @ApiProperty({
    description: 'Enable or disable all in-app notifications',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => InAppOption) // Simple inline type for a simple object
  inApp?: InAppOption;
}

export class UpdateMemberProfileDto {
  @ApiProperty({ example: 'Jane', description: "Member's first name" })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'Doe', description: "Member's last name" })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    example: 'A passionate developer interested in AI.',
    description: 'A short biography',
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({
    type: [String],
    example: ['AI', 'Python', 'Public Speaking'],
    description: 'A list of member interests or skills',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @ApiProperty({
    description: 'Settings for how the member receives notifications',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateNotificationPreferencesDto)
  notificationPreferences?: UpdateNotificationPreferencesDto;
}
