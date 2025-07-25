// src/engagement-tracking/engagement-tracking.controller.ts
import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { EngagementTrackingService } from './engagement-tracking.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  MemberEngagementDto,
  LeaderboardEntryDto,
} from './dto/engagement-analytics.dto';
import { ActivityLog } from 'src/entities/activity-log.entity';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { ActivityEventType } from 'src/entities/types/activity-log.types';

@ApiTags('Engagement & Analytics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard) // Protect all endpoints
@Controller('engagement')
export class EngagementTrackingController {
  constructor(private readonly service: EngagementTrackingService) {}

  @Get('history/:memberId')
  @ApiOperation({ summary: "Get a member's full activity history" })
  @ApiResponse({
    status: 200,
    description: 'Activity history retrieved.',
    type: [ActivityLog],
  })
  getActivityForMember(
    @Param('memberId', ParseObjectIdPipe) memberId: string,
  ): Promise<ActivityLog[]> {
    return this.service.findActivityForMember(memberId);
  }

  @Get('analytics/:memberId')
  @ApiOperation({ summary: "Get a member's engagement analytics" })
  @ApiResponse({
    status: 200,
    description: 'Analytics retrieved.',
    type: MemberEngagementDto,
  })
  getMemberAnalytics(
    @Param('memberId', ParseObjectIdPipe) memberId: string,
  ): Promise<MemberEngagementDto> {
    return this.service.getMemberEngagementAnalytics(memberId);
  }

  @Get('leaderboard')
  @ApiOperation({ summary: 'Get a leaderboard for a specific activity type' })
  @ApiQuery({
    name: 'eventType',
    enum: ActivityEventType,
    description: 'The type of activity to rank by',
  })
  @ApiResponse({
    status: 200,
    description: 'Leaderboard retrieved.',
    type: [LeaderboardEntryDto],
  })
  getLeaderboard(
    @Query('eventType') eventType: ActivityEventType,
  ): Promise<LeaderboardEntryDto[]> {
    return this.service.getLeaderboard(eventType);
  }
}
