import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
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
  getById(@Param('id') id: string) {
    return this.memberService.findById(id);
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string): Promise<Object> {
    return this.memberService.findByEmail(email);
  }
}
