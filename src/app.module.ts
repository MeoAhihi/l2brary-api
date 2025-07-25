import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MembersModule } from './modules/members/members.module';
import { MemberProfileModule } from './member-profile/member-profile.module';
import { GroupRoleManagementModule } from './group-role-management/group-role-management.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    MembersModule,
    MemberProfileModule,
    GroupRoleManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
