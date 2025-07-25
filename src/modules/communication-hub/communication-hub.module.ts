import { Module } from '@nestjs/common';
import { CommunicationHubService } from './communication-hub.service';
import { CommunicationHubController } from './communication-hub.controller';

@Module({
  controllers: [CommunicationHubController],
  providers: [CommunicationHubService],
})
export class CommunicationHubModule {}
