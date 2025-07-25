// src/engagement-tracking/engagement-tracking.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { LogActivityDto } from './dto/log-activity.dto';
import {
  MemberEngagementDto,
  LeaderboardEntryDto,
} from './dto/engagement-analytics.dto';
import { ActivityLog } from 'src/entities/activity-log.entity';
import { Member } from 'src/entities/member.entity';
import { ActivityEventType } from 'src/entities/types/activity-log.types';

@Injectable()
export class EngagementTrackingService {
  constructor(
    @InjectRepository(ActivityLog)
    private readonly activityLogRepository: MongoRepository<ActivityLog>,
    @InjectRepository(Member) // Inject Member repository for leaderboard lookups
    private readonly memberRepository: MongoRepository<Member>,
  ) {}

  /**
   * Creates a new activity log entry. This is the primary method
   * to be called by other services.
   * @param logActivityDto The data for the activity to log.
   */
  async logActivity(logActivityDto: LogActivityDto): Promise<ActivityLog> {
    const newLog = this.activityLogRepository.create(logActivityDto);
    return this.activityLogRepository.save(newLog);
  }

  /**
   * Retrieves the full activity history for a specific member.
   * @param memberId The ID of the member.
   */
  async findActivityForMember(memberId: string): Promise<ActivityLog[]> {
    return this.activityLogRepository.find({
      where: { memberId: new ObjectId(memberId) },
      order: { timestamp: 'DESC' },
    });
  }

  /**
   * Generates engagement analytics for a specific member.
   * @param memberId The ID of the member.
   */
  async getMemberEngagementAnalytics(
    memberId: string,
  ): Promise<MemberEngagementDto> {
    const memberObjectId = new ObjectId(memberId);

    // Use the MongoDB aggregation pipeline for efficient analytics
    const aggregationResult = await this.activityLogRepository
      .aggregate([
        { $match: { memberId: memberObjectId } },
        {
          $group: {
            _id: '$eventType',
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            eventType: '$_id',
            count: 1,
          },
        },
      ])
      .toArray();

    const lastActivity = await this.activityLogRepository.findOne({
      where: { memberId: memberObjectId },
      order: { timestamp: 'DESC' },
    });

    return {
      memberId,
      totalActivities: aggregationResult.reduce(
        (sum, item) => sum + item.count,
        0,
      ),
      activityBreakdown: aggregationResult,
      lastActivityAt: lastActivity ? lastActivity.timestamp : null,
    };
  }

  /**
   * Generates a leaderboard for a specific event type over a given period.
   * @param eventType The type of event to rank by.
   * @param limit The number of top members to return.
   */
  async getLeaderboard(
    eventType: ActivityEventType,
    limit = 10,
  ): Promise<LeaderboardEntryDto[]> {
    const aggregationResult = await this.activityLogRepository
      .aggregate([
        { $match: { eventType } },
        {
          $group: {
            _id: '$memberId',
            score: { $sum: 1 }, // Simple count-based score
          },
        },
        { $sort: { score: -1 } },
        { $limit: limit },
      ])
      .toArray();

    // Get member details for the top entries
    const memberIds = aggregationResult.map((item) => item._id);
    const members = await this.memberRepository.find({
      where: { _id: { $in: memberIds } },
      select: ['_id', 'firstName', 'lastName'],
    });

    // Map member details back to the leaderboard results
    const memberMap = new Map(members.map((m) => [m._id.toHexString(), m]));

    return aggregationResult.map((item) => {
      const member = memberMap.get(item._id.toHexString());
      return {
        memberId: item._id.toHexString(),
        fullName: member ? member.fullName : 'Unknown',
        // lastName: member ? member.lastName : 'User',
        score: item.score,
      };
    });
  }
}
