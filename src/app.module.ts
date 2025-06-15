import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MembersModule } from './members/members.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ClassesModule } from './classes/classes.module';
import { ClassGroupsModule } from './class-groups/class-groups.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI as string, {
      onConnectionCreate: (connection: Connection) => {
        connection.on('connected', () => console.log('connected'));
        connection.on('open', () => console.log('open'));
        connection.on('disconnected', () => console.log('disconnected'));
        connection.on('reconnected', () => console.log('reconnected'));
        connection.on('disconnecting', () => console.log('disconnecting'));

        return connection;
      },
    }),
    AuthModule,
    MembersModule,
    ClassesModule,
    ClassGroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
