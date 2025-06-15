import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Class } from './entities/class.entity';
import { Model } from 'mongoose';

@Injectable()
export class ClassesService {
  constructor(@InjectModel(Class.name) private classModel: Model<Class>) {}

  async create(createClassDto: CreateClassDto): Promise<Class> {
    const createdClass = new this.classModel(createClassDto);
    return createdClass.save();
  }

  findAll(): Promise<Class[]> {
    return this.classModel.find().exec();
  }

  findOne(id: string) {
    const member = this.classModel.findById(id);
    return member;
  }

  update(id: string, updateClassDto: UpdateClassDto): Promise<Class> {
    return this.classModel.findByIdAndUpdate(id, updateClassDto, {
      new: true,
    }) as Promise<Class>;
  }

  remove(id: string): Promise<Class> {
    return this.classModel.findByIdAndDelete(id) as Promise<Class>;
  }
}
