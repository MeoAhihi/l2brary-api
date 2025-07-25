import { Module } from '@nestjs/common';
import { EngagementTrackingService } from './engagement-tracking.service';
import { EngagementTrackingController } from './engagement-tracking.controller';

@Module({
  controllers: [EngagementTrackingController],
  providers: [EngagementTrackingService],
})
export class EngagementTrackingModule {}
