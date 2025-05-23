import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { Request as RequestType } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private memberService: MembersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Object> {
    return this.memberService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: RequestType) {
    return req.user;
  }

  @Get('birthdays')
  getBirthdays() {
    return this.memberService.findAllMonthOfBirth();
  }

  @Get(':id')
  getById(@Request() req: RequestType) {
    return this.memberService.findById(req.params.id);
  }

  @Get('email/:email')
  findByEmail(@Request() req: RequestType): Promise<Object> {
    return this.memberService.findByEmail(req.params.email);
  }
}
