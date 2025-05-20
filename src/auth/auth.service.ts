import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MembersService } from 'src/members/members.service';
import { JwtService } from '@nestjs/jwt';

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

  async login(member: any) {
    const payload = { email: member.email, sub: member._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async logIn(email: string, pass: string): Promise<{ access_token: string }> {
    const member = await this.membersService.findOne(email);
    if (!member || member?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: member._id, email: member.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(email: string, pass: string) {
    const member = await this.membersService.findOne(email);
    if (member && member.password === pass) {
      const { password, ...result } = member;
      return result;
    }
    return null;
  }
}
