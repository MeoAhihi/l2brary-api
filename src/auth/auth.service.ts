import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MembersService } from 'src/members/members.service';
import { JwtService } from '@nestjs/jwt';

import { Member } from 'src/members/schemas/member.schema';

@Injectable()
export class AuthService {
  constructor(
    private membersService: MembersService,
    private jwtService: JwtService,
  ) {}

  async validateMember(email: string, pass: string): Promise<any> {
    const member = await this.membersService.findOne(email);
    if (member && member.password === pass) {
      const { password, ...result } = member;
      return result;
    }
    return null;
  }

  async login(member: any): Promise<{ access_token: string }> {
    const payload = { email: member.email, sub: member._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(data: Member) {
    const duplicateEmailMember = await this.membersService.findByEmail(
      data.email,
    );
    if (duplicateEmailMember) {
      throw new UnauthorizedException('Email already exists');
    }
    const member = await this.membersService.create(data);
    return member;
  }
}
