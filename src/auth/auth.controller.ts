import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { Request as RequestType } from 'express';
import { UserMemberDto } from 'src/members/dto/user-member.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

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
    @Body() body: UserMemberDto,
  ): Promise<{ access_token: string }> {
    //register new member
    const newMember = await this.authService.register(body);

    //send email to new member

    //login new member
    return this.authService.login(newMember);
  }
}
