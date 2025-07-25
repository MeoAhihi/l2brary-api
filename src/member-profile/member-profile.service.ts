// src/member-profile/member-profile.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Member } from 'src/entities/member.entity';
import { UpdateMemberProfileDto } from './dto/update-member-profile.dto';

@Injectable()
export class MemberProfileService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: MongoRepository<Member>,
  ) {}

  /**
   * Finds a member's profile by their ID.
   * @param id The BSON ObjectId of the member.
   * @returns The full Member entity.
   * @throws NotFoundException if no member is found.
   */
  async findOne(id: string): Promise<Member> {
    const member = await this.memberRepository.findOneBy({
      _id: new ObjectId(id),
    });

    if (!member) {
      throw new NotFoundException(`Member with ID "${id}" not found`);
    }

    return member;
  }

  /**
   * Updates a member's profile data.
   * @param id The ID of the member to update.
   * @param updateDto The data to update.
   * @returns The updated Member entity.
   */
  async update(id: string, updateDto: UpdateMemberProfileDto): Promise<Member> {
    // The findOne method will throw a NotFoundException if the user doesn't exist
    const memberToUpdate = await this.findOne(id);

    // Merge the new data into the existing entity
    // This is safer than just updating because it respects existing fields
    const updatedMember = this.memberRepository.merge(
      memberToUpdate,
      updateDto,
    );

    return this.memberRepository.save(updatedMember);
  }
}
