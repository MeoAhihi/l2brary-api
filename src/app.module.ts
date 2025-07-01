import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MembersModule } from './members/members.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI as string), MembersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
