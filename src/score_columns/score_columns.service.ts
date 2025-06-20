import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateScoreColumnDto } from './dto/create-score_column.dto';
import { UpdateScoreColumnDto } from './dto/update-score_column.dto';
import { ScoreColumn } from './entities/score_column.entity';

@Injectable()
export class ScoreColumnsService {
  constructor(
    @InjectModel(ScoreColumn.name) private scoreColumnModel: Model<ScoreColumn>,
  ) {}

  async create(
    createScoreColumnDto: CreateScoreColumnDto,
  ): Promise<ScoreColumn> {
    const createdScoreColumn = new this.scoreColumnModel(createScoreColumnDto);
    return createdScoreColumn.save();
  }

  async findAll(): Promise<ScoreColumn[]> {
    return this.scoreColumnModel.find().exec();
  }

  async findOne(id: string): Promise<ScoreColumn> {
    return this.scoreColumnModel.findById(id).exec() as Promise<ScoreColumn>;
  }

  async update(
    id: string,
    updateScoreColumnDto: UpdateScoreColumnDto,
  ): Promise<ScoreColumn> {
    return this.scoreColumnModel
      .findByIdAndUpdate(id, updateScoreColumnDto, { new: true })
      .exec() as Promise<ScoreColumn>;
  }

  async remove(id: string): Promise<ScoreColumn> {
    return this.scoreColumnModel
      .findByIdAndDelete(id)
      .exec() as Promise<ScoreColumn>;
  }
}
