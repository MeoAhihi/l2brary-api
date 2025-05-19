import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MembersService } from 'src/members/members.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private membersService: MembersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const member = await this.membersService.findOne(username);
    if (member?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: member.userId, username: member.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
