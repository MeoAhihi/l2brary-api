import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session, SessionDocument } from './entities/session.entity';
import { AttendanceDto } from './dto/attendance.dto';
import { CompleteQuizDto } from './dto/complete-quiz.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session.name)
    private sessionModel: Model<SessionDocument>,
  ) {}

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const createdSession = new this.sessionModel(createSessionDto);
    return createdSession.save();
  }

  async findAll(): Promise<Session[]> {
    return this.sessionModel.find().exec();
  }

  async findOne(id: string): Promise<Session> {
    return this.sessionModel.findById(id).exec() as Promise<Session>;
  }

  async update(
    id: string,
    updateSessionDto: UpdateSessionDto,
  ): Promise<Session> {
    return this.sessionModel
      .findByIdAndUpdate(id, updateSessionDto, { new: true })
      .exec() as Promise<Session>;
  }

  async attend(id: string, attendanceDto: AttendanceDto): Promise<Session> {
    return this.sessionModel
      .findByIdAndUpdate(
        id,
        { $push: { attendances: attendanceDto } },
        { new: true },
      )
      .exec() as Promise<Session>;
  }

  async attendBulk(
    id: string,
    attendanceDto: AttendanceDto[],
  ): Promise<Session> {
    return this.sessionModel
      .findByIdAndUpdate(
        id,
        { $push: { attendances: { $each: attendanceDto } } },
        { new: true },
      )
      .exec() as Promise<Session>;
  }

  async completeQuiz(id: string, CompleteQuizDto: CompleteQuizDto) {
    return this.sessionModel
      .findByIdAndUpdate(
        id,
        { $push: { quiz_completes: CompleteQuizDto } },
        { new: true },
      )
      .exec() as Promise<Session>;
  }

  async completeQuizBulk(
    id: string,
    CompleteQuizDto: CompleteQuizDto[],
  ): Promise<Session> {
    return this.sessionModel
      .findByIdAndUpdate(
        id,
        { $push: { quiz_completes: { $each: CompleteQuizDto } } },
        { new: true },
      )
      .exec() as Promise<Session>;
  }

  async remove(id: string): Promise<Session> {
    return this.sessionModel.findByIdAndDelete(id).exec() as Promise<Session>;
  }
}
