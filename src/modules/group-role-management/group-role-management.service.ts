// src/group-role-management/group-role-management.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, In } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Group } from 'src/entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from 'src/entities/role.entity';
import { Member } from 'src/entities/member.entity';

@Injectable()
export class GroupRoleManagementService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: MongoRepository<Group>,
    @InjectRepository(Role)
    private readonly roleRepository: MongoRepository<Role>,
    @InjectRepository(Member)
    private readonly memberRepository: MongoRepository<Member>,
  ) {}

  // --- Role Management ---

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const existingRole = await this.roleRepository.findOneBy({
      name: createRoleDto.name,
    });
    if (existingRole) {
      throw new ConflictException(
        `Role with name "${createRoleDto.name}" already exists.`,
      );
    }
    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }

  findAllRoles(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findRoleById(id: string): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ _id: new ObjectId(id) });
    if (!role) throw new NotFoundException(`Role with ID "${id}" not found.`);
    return role;
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findRoleById(id);
    this.roleRepository.merge(role, updateRoleDto);
    return this.roleRepository.save(role);
  }

  async deleteRole(id: string): Promise<void> {
    const result = await this.roleRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Role with ID "${id}" not found.`);
    }
  }

  // --- Group Management ---

  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    const existingGroup = await this.groupRepository.findOneBy({
      name: createGroupDto.name,
    });
    if (existingGroup) {
      throw new ConflictException(
        `Group with name "${createGroupDto.name}" already exists.`,
      );
    }
    const group = this.groupRepository.create(createGroupDto);
    return this.groupRepository.save(group);
  }

  findAllGroups(): Promise<Group[]> {
    return this.groupRepository.find();
  }

  async findGroupById(id: string): Promise<Group> {
    const group = await this.groupRepository.findOneBy({
      _id: new ObjectId(id),
    });
    if (!group) throw new NotFoundException(`Group with ID "${id}" not found.`);
    return group;
  }

  async updateGroup(
    id: string,
    updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    const group = await this.findGroupById(id);
    this.groupRepository.merge(group, updateGroupDto);
    return this.groupRepository.save(group);
  }

  async deleteGroup(id: string): Promise<void> {
    const result = await this.groupRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Group with ID "${id}" not found.`);
    }
  }

  // --- Member Assignment ---

  private async findMemberById(memberId: string): Promise<Member> {
    const member = await this.memberRepository.findOneBy({
      _id: new ObjectId(memberId),
    });
    if (!member)
      throw new NotFoundException(`Member with ID "${memberId}" not found.`);
    return member;
  }

  async assignRoleToMember(roleId: string, memberId: string): Promise<Member> {
    const role = await this.findRoleById(roleId);
    const member = await this.findMemberById(memberId);

    const roleObjectId = new ObjectId(roleId);
    if (!member.roleIds.some((id) => id.equals(roleObjectId))) {
      member.roleIds.push(roleObjectId);
      await this.memberRepository.save(member);
    }
    return member;
  }

  async removeRoleFromMember(
    roleId: string,
    memberId: string,
  ): Promise<Member> {
    const member = await this.findMemberById(memberId);
    const roleObjectId = new ObjectId(roleId);
    member.roleIds = member.roleIds.filter((id) => !id.equals(roleObjectId));
    return this.memberRepository.save(member);
  }

  async assignGroupToMember(
    groupId: string,
    memberId: string,
  ): Promise<Member> {
    const group = await this.findGroupById(groupId);
    const member = await this.findMemberById(memberId);

    const groupObjectId = new ObjectId(groupId);
    if (!member.groupIds.some((id) => id.equals(groupObjectId))) {
      member.groupIds.push(groupObjectId);
      await this.memberRepository.save(member);
    }
    return member;
  }

  async removeGroupFromMember(
    groupId: string,
    memberId: string,
  ): Promise<Member> {
    const member = await this.findMemberById(memberId);
    const groupObjectId = new ObjectId(groupId);
    member.groupIds = member.groupIds.filter((id) => !id.equals(groupObjectId));
    return this.memberRepository.save(member);
  }

  async findMembersInGroup(groupId: string): Promise<Member[]> {
    await this.findGroupById(groupId); // Validate group exists
    return this.memberRepository.find({
      where: { groupIds: { $in: [new ObjectId(groupId)] } },
    });
  }

  async findMembersWithRole(roleId: string): Promise<Member[]> {
    await this.findRoleById(roleId); // Validate role exists
    return this.memberRepository.find({
      where: { roleIds: { $in: [new ObjectId(roleId)] } },
    });
  }
}
