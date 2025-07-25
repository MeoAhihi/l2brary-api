import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/entities/member.entity';
import { MemberProfileController } from './member-profile.controller';
import { MemberProfileService } from './member-profile.service';
// You would also import and provide your AuthModule if it exports the JwtStrategy/Guard
// import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    // AuthModule, // Import AuthModule to use its Guards
  ],
  controllers: [MemberProfileController],
  providers: [MemberProfileService],
  exports: [MemberProfileService], // Export the service if other modules need to find members
})
export class MemberProfileModule {}
