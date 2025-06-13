import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from './schemas/member.schema';
@Injectable()
export class MembersService {
  constructor(@InjectModel(Member.name) private memberModel: Model<Member>) {}

  async findOne(email: string): Promise<any | undefined> {
    return (await this.memberModel.findOne({ email }).exec()) as Member;
  }

  async findAll(): Promise<Member[]> {
    return this.memberModel
      .find()
      .select(
        'fullname international_name is_male role birthday phone_number email',
      )
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

  async create(memberData: Member): Promise<Member> {
    const newMember = new this.memberModel(memberData);
    return newMember.save();
  }

  async updateInformation(id: string, memberData: Member): Promise<Member> {
    return (await this.memberModel
      .findByIdAndUpdate(id, memberData, { new: true })
      .exec()) as Member;
  }

  async updateAchievements(
    id: string,
    achievements: Member[],
  ): Promise<Member> {
    return (await this.memberModel
      .findByIdAndUpdate(id, { achievements }, { new: true })
      .exec()) as Member;
  }

  async delete(id: string): Promise<Member> {
    return (await this.memberModel.findByIdAndDelete(id).exec()) as Member;
  }
}
