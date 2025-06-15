import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClassGroupDto } from '../class-groups/dto/create-class-group.dto';
import { ClassGroup } from '../class-groups/entities/class_group.entity';
import { UpdateClassGroupDto } from './dto/update-class-group.dto';

@Injectable()
export class ClassGroupsService {
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

  findOne(id: string): Promise<ClassGroup> {
    return this.classGroupModel.findById(id).exec() as Promise<ClassGroup>;
  }

  async update(
    id: string,
    updateClassGroupDto: UpdateClassGroupDto,
  ): Promise<ClassGroup> {
    return this.classGroupModel
      .findByIdAndUpdate(id, updateClassGroupDto, { new: true })
      .exec() as Promise<ClassGroup>;
  }

  async remove(id: string): Promise<ClassGroup> {
    return this.classGroupModel
      .findByIdAndDelete(id)
      .exec() as Promise<ClassGroup>;
  }

  async removeAll(): Promise<any> {
    return this.classGroupModel.deleteMany({}).exec();
  }

  async count(): Promise<number> {
    return this.classGroupModel.countDocuments().exec();
  }
}
