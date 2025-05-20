import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from './schemas/member.schema';
import { CreateMemberDto } from './dto/create-member.dto';
@Injectable()
export class MembersService {
  constructor(@InjectModel(Member.name) private memberModel: Model<Member>) {}

  private readonly users = [
    {
      _id: 1,
      email: 'john',
      password: 'changeme',
    },
    {
      _id: 2,
      email: 'maria',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<any | undefined> {
    return this.users.find(user => user.email === email);
  }
  // async findOne(email: string): Promise<any | undefined> {
  //   return this.memberModel.findOne({ email }).exec();
  // }

  async findAll(): Promise<Member[]> {
    return this.memberModel.find().exec();
  }

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const newMember = new this.memberModel(createMemberDto);
    return newMember.save();
  }
}
