// src/engagement-tracking/dto/engagement-analytics.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { ActivityEventType } from 'src/entities/types/activity-log.types';

class ActivityCount {
  @ApiProperty({ enum: ActivityEventType })
  eventType: ActivityEventType;

  @ApiProperty()
  count: number;
}

export class MemberEngagementDto {
  @ApiProperty({ description: "The member's ID" })
  memberId: string;

  @ApiProperty({
    description: 'Total number of activities logged for the member.',
  })
  totalActivities: number;

  @ApiProperty({
    type: [ActivityCount],
    description: 'Breakdown of activities by type.',
  })
  activityBreakdown: ActivityCount[];

  @ApiProperty({
    description: "Timestamp of the member's last recorded activity.",
  })
  lastActivityAt: Date | null;
}

export class LeaderboardEntryDto {
  @ApiProperty({ description: "The member's ID" })
  memberId: string;

  @ApiProperty({ description: "The member's name" })
  fullName: string;

  @ApiProperty({
    description: 'The engagement score or count for the leaderboard metric',
  })
  score: number;
}
