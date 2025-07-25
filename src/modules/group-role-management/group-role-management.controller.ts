// src/group-role-management/group-role-management.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GroupRoleManagementService } from './group-role-management.service';
import { Role } from 'src/entities/role.entity';
import { Member } from 'src/entities/member.entity';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Group } from 'src/entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { ManageMemberAssignmentDto } from './dto/manage-member-assignment.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
// import { RolesGuard } from '../auth/guards/roles.guard'; // A custom guard to check for 'Admin' role
// import { Roles } from '../auth/decorators/roles.decorator'; // A custom decorator @Roles('Admin')

@ApiTags('Admin: Group & Role Management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard) // Protect all routes
// @UseGuards(JwtAuthGuard, RolesGuard) // In a real app, you'd add a RolesGuard
// @Roles('Admin') // And specify that only Admins can access this controller
@Controller('admin/management')
export class GroupRoleManagementController {
  constructor(private readonly service: GroupRoleManagementService) {}

  // --- Role Endpoints ---
  @Post('roles')
  @ApiOperation({ summary: '[Admin] Create a new role' })
  createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.service.createRole(createRoleDto);
  }

  @Get('roles')
  @ApiOperation({ summary: '[Admin] Get all roles' })
  findAllRoles(): Promise<Role[]> {
    return this.service.findAllRoles();
  }

  @Patch('roles/:id')
  @ApiOperation({ summary: '[Admin] Update a role' })
  updateRole(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    return this.service.updateRole(id, updateRoleDto);
  }

  @Delete('roles/:id')
  @ApiOperation({ summary: '[Admin] Delete a role' })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteRole(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    return this.service.deleteRole(id);
  }

  @Post('roles/:roleId/assign-member')
  @ApiOperation({ summary: '[Admin] Assign a role to a member' })
  assignRole(
    @Param('roleId', ParseObjectIdPipe) roleId: string,
    @Body() dto: ManageMemberAssignmentDto,
  ): Promise<Member> {
    return this.service.assignRoleToMember(roleId, dto.memberId);
  }

  @Post('roles/:roleId/unassign-member')
  @ApiOperation({ summary: '[Admin] Unassign a role from a member' })
  unassignRole(
    @Param('roleId', ParseObjectIdPipe) roleId: string,
    @Body() dto: ManageMemberAssignmentDto,
  ): Promise<Member> {
    return this.service.removeRoleFromMember(roleId, dto.memberId);
  }

  // --- Group Endpoints ---
  @Post('groups')
  @ApiOperation({ summary: '[Admin] Create a new group' })
  createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.service.createGroup(createGroupDto);
  }

  @Get('groups')
  @ApiOperation({ summary: '[Admin] Get all groups' })
  findAllGroups(): Promise<Group[]> {
    return this.service.findAllGroups();
  }

  @Get('groups/:id/members')
  @ApiOperation({ summary: '[Admin] Get all members in a specific group' })
  findMembersInGroup(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<Member[]> {
    return this.service.findMembersInGroup(id);
  }

  @Patch('groups/:id')
  @ApiOperation({ summary: '[Admin] Update a group' })
  updateGroup(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    return this.service.updateGroup(id, updateGroupDto);
  }

  @Delete('groups/:id')
  @ApiOperation({ summary: '[Admin] Delete a group' })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteGroup(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    return this.service.deleteGroup(id);
  }

  @Post('groups/:groupId/assign-member')
  @ApiOperation({ summary: '[Admin] Assign a member to a group' })
  assignGroup(
    @Param('groupId', ParseObjectIdPipe) groupId: string,
    @Body() dto: ManageMemberAssignmentDto,
  ): Promise<Member> {
    return this.service.assignGroupToMember(groupId, dto.memberId);
  }

  @Post('groups/:groupId/unassign-member')
  @ApiOperation({ summary: '[Admin] Unassign a member from a group' })
  unassignGroup(
    @Param('groupId', ParseObjectIdPipe) groupId: string,
    @Body() dto: ManageMemberAssignmentDto,
  ): Promise<Member> {
    return this.service.removeGroupFromMember(groupId, dto.memberId);
  }
}
