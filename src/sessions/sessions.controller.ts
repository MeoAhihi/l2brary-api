import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { MembersService } from 'src/members/members.service';
import { AttendanceDto } from './dto/attendance.dto';
import { CompleteQuizDto } from './dto/complete-quiz.dto';

@Controller('sessions')
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly membersService: MembersService,
  ) {}

  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

  @Get()
  findAll() {
    return this.sessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionsService.update(id, updateSessionDto);
  }

  @Post(':id/attend')
  async attend(
    @Param('id') id: string,
    @Body() createAttendanceDto: CreateAttendanceDto,
  ) {
    const member = await this.membersService.findOne(
      createAttendanceDto.member_id,
    );
    const attendanceDto: AttendanceDto = {
      ...createAttendanceDto,
      member_name: member.name,
    };

    return this.sessionsService.attend(id, attendanceDto);
  }

  @Post(':id/attend-bulk')
  async attendBulk(
    @Param('id') id: string,
    @Body() createAttendanceDto: CreateAttendanceDto[],
  ) {
    const attendanceDtos: AttendanceDto[] = await Promise.all(
      createAttendanceDto.map(async (createAttendanceDto) => {
        const member = await this.membersService.findOne(
          createAttendanceDto.member_id,
        );
        return {
          ...createAttendanceDto,
          member_name: member.name,
        };
      }),
    );
    return this.sessionsService.attendBulk(id, attendanceDtos);
  }

  @Post(':id/complete-quiz')
  completeQuiz(
    @Param('id') id: string,
    @Body() completeQuizDto: CompleteQuizDto,
  ) {
    return this.sessionsService.completeQuiz(id, completeQuizDto);
  }

  @Post(':id/complete-quiz-bulk')
  completeQuizBulk(
    @Param('id') id: string,
    @Body() completeQuizDto: CompleteQuizDto[],
  ) {
    return this.sessionsService.completeQuizBulk(id, completeQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(id);
  }
}
