import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MembersModule } from './modules/members/members.module';
import { MemberProfileModule } from './member-profile/member-profile.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    MembersModule,
    MemberProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
