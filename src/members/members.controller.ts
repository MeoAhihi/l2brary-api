import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { Request as RequestType } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('members')
export class MembersController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: RequestType) {
    return req.user;
  }
}
