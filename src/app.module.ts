import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MembersModule } from './modules/members/members.module';
import { MemberProfileModule } from './member-profile/member-profile.module';
import { GroupRoleManagementModule } from './group-role-management/group-role-management.module';
import { EngagementTrackingModule } from './modules/engagement-tracking/engagement-tracking.module';
import { CommunicationHubModule } from './modules/communication-hub/communication-hub.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    MembersModule,
    MemberProfileModule,
    GroupRoleManagementModule,
    EngagementTrackingModule,
    CommunicationHubModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
