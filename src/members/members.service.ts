import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserMemberDto } from './dto/user-member.dto';
import { Member } from './schemas/member.schema';
import { AdminMemberDto } from './dto/admin-member.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
@Injectable()
export class MembersService {
  constructor(@InjectModel(Member.name) private memberModel: Model<Member>) {}

  async findOne(email: string): Promise<any | undefined> {
    return (await this.memberModel.findOne({ email }).exec()) as Member;
  }

  async findAll(): Promise<Member[]> {
    return this.memberModel
      .find()
      .select('fullname is_male school_class role avatar_url')
      .exec();
  }
  async findById(id: string): Promise<Member> {
    return (await this.memberModel
      .findById(id)
      .select('-password')
      .exec()) as Member;
  }

  async findByEmail(email: string): Promise<Member> {
    return (await this.memberModel.findOne({ email }).exec()) as Member;
  }

  async findAllMonthOfBirth() {
    return await this.memberModel.aggregate([
      {
        $project: {
          fullname: 1,
          birthday: 1,
          month: {
            $month: '$birthday',
          },
        },
      },
      {
        $group: {
          _id: '$month',
          members: {
            $push: {
              fullname: '$fullname',
              birthday: '$birthday',
              member_id: '$_id',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: '$_id',
          members: 1,
        },
      },
    ]);
  }

  async create(
    createMemberDto: UserMemberDto | AdminMemberDto,
  ): Promise<Member> {
    const newMember = new this.memberModel(createMemberDto);
    return newMember.save();
  }

  async updateInformation(
    id: string,
    updateMemberDto: UserMemberDto | AdminMemberDto,
  ): Promise<Member> {
    return (await this.memberModel
      .findByIdAndUpdate(id, updateMemberDto, { new: true })
      .exec()) as Member;
  }

  async updateAchievements(
    id: string,
    achievements: UpdateAchievementDto[],
  ): Promise<Member> {
    return (await this.memberModel
      .findByIdAndUpdate(id, { achievements }, { new: true })
      .exec()) as Member;
  }

  async delete(id: string): Promise<Member> {
    return (await this.memberModel.findByIdAndDelete(id).exec()) as Member;
  }
}
