import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './schemas/member.schema';
@Injectable()
export class MembersService {
  constructor(@InjectModel(Member.name) private memberModel: Model<Member>) {}
  
  async findOne(email: string): Promise<any | undefined> {
    return await this.memberModel.findOne({ email }).exec() as Member;
  }

  async findAll(): Promise<Member[]> {
    return this.memberModel.find().exec();
  }

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const newMember = new this.memberModel(createMemberDto);
    return newMember.save();
  }

  async findByEmail(email: string): Promise<Member> {
    return await this.memberModel.findOne({ email }).exec() as Member;
  }
}
