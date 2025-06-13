import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClassGroupDto } from './dto/create-class-group.dto';
import { ClassGroup } from './entities/class_group.entity';

@Injectable()
export class ClassGroupService {
  constructor(
    @InjectModel(ClassGroup.name) private classGroupModel: Model<ClassGroup>,
  ) {}

  create(createClassGroupDto: CreateClassGroupDto) {
    const createdClassGroup = new this.classGroupModel(createClassGroupDto);
    return createdClassGroup.save();
  }

  findAll(): Promise<ClassGroup[]> {
    return this.classGroupModel.find().exec();
  }
}
