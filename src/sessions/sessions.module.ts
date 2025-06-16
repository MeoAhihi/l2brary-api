import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { MembersModule } from 'src/members/members.module';

@Module({
  imports: [MembersModule],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
