import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Class } from './entities/class.entity';
import { Model, Types } from 'mongoose';
import { QueryClassDto } from './dto/query-class.dto';

@Injectable()
export class ClassesService {
  constructor(@InjectModel(Class.name) private classModel: Model<Class>) {}

  async create(createClassDto: CreateClassDto): Promise<Class> {
    const createdClass = new this.classModel(createClassDto);
    return createdClass.save();
  }

  findAll(
    class_group_id: string,
    queryClassDto: QueryClassDto = {},
  ): Promise<Class[]> {
    const query = { class_group: new Types.ObjectId(class_group_id) };

    if (queryClassDto.name) {
      query['name'] = { $regex: queryClassDto.name, $options: 'i' };
    }

    if (queryClassDto.day) {
      query['day'] = queryClassDto.day;
    }

    if (queryClassDto.frequency) {
      query['frequency'] = queryClassDto.frequency;
    }

    if (queryClassDto.time_range) {
      query['time_range'] = {
        start_time: { $lte: queryClassDto.time_range.start_time },
        end_time: { $gte: queryClassDto.time_range.end_time },
      };
    }

    return this.classModel.find(query).exec();
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
    return this.classModel
      .findByIdAndUpdate(
        id,
        {
          deleted_at: new Date(),
        },
        { new: true },
      )
      .exec() as Promise<Class>;
  }

  addMembers(id: string, member_ids: string[]): Promise<Class> {
    return this.classModel.findByIdAndUpdate(id, {
      $push: {
        class_members: {
          $each: member_ids.map((member_id) => ({
            member_id: new Types.ObjectId(member_id),
          })),
        },
      },
    }) as Promise<Class>;
  }

  removeMembers(id: string, member_ids: string[]): Promise<Class> {
    return this.classModel.findByIdAndUpdate(id, {
      $pull: {
        class_members: {
          member_id: {
            $in: member_ids.map((member_id) => new Types.ObjectId(member_id)),
          },
        },
      },
    }) as Promise<Class>;
  }

  private async isOverlapped(day: string, start_at: string, end_at: string) {
    const existingClass = await this.classModel.findOne({
      day,
      $or: [{ start_at: { $lt: end_at } }, { end_at: { $gt: start_at } }],
    });
    return !!existingClass;
  }
}
