import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './schemas/member.schema';

@Injectable()
export class MembersService {
  constructor(@InjectModel(Member.name) private memberModel: Model<Member>) {}

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const createdMember = new this.memberModel(createMemberDto);
    return createdMember.save();
  }

  async findAll(): Promise<Member[]> {
    return this.memberModel.find().exec();
  }

  async findOne(id: string): Promise<Member> {
    const member = await this.memberModel.findById(id).exec();
    if (!member) {
      throw new ConflictException('Member not found');
    }
    return member;
  }

  async update(id: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
    const updatedMember = await this.memberModel
      .findByIdAndUpdate(id, updateMemberDto, { new: true })
      .exec();

    if (!updatedMember) {
      throw new ConflictException('Member not found');
    }

    return updatedMember;
  }

  async remove(id: string): Promise<{ deleted_at: Date }> {
    const deletedMember = await this.memberModel
      .findByIdAndUpdate(id, { deleted_at: new Date() }, { new: true })
      .exec();

    if (!deletedMember) {
      throw new ConflictException('Member not found');
    }
    return { deleted_at: deletedMember.deleted_at };
  }

  async restore(id: string): Promise<Member> {
    const restoredMember = await this.memberModel
      .findByIdAndUpdate(id, { deleted_at: null }, { new: true })
      .exec();

    if (!restoredMember) {
      throw new ConflictException('Member not found');
    }

    return restoredMember;
  }

  async changePassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<Member> {
    const member = await this.memberModel.findById(id).exec();

    if (!member) {
      throw new ConflictException('Member not found');
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, member.password);

    if (!isPasswordValid) {
      throw new ConflictException('Invalid old password');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    member.password = hashedNewPassword;

    return member.save();
  }
}
