// src/group-role-management/group-role-management.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupRoleManagementController } from './group-role-management.controller';
import { GroupRoleManagementService } from './group-role-management.service';
import { Group } from 'src/entities/group.entity';
import { Role } from 'src/entities/role.entity';
import { Member } from 'src/entities/member.entity';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, Role, Member]),
    AuthModule, // Provides JwtAuthGuard
  ],
  controllers: [GroupRoleManagementController],
  providers: [GroupRoleManagementService],
})
export class GroupRoleManagementModule {}
