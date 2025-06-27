import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { Request as RequestType } from 'express';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Member } from 'src/members/schemas/member.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: RequestType): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(
    @Body() body: Member,
  ): Promise<{ access_token: string }> {
    //register new member
    const newMember = await this.authService.register(body);

    //send email to new member

    //login new member
    return this.authService.login(newMember);
  }
}
