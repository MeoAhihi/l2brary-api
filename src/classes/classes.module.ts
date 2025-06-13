import { Module } from '@nestjs/common';
import { ClassGroupController } from './class-groups.controller';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { ClassGroupService } from './class-group.service';
import { ClassGroup, ClassGroupSchema } from './entities/class_group.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClassGroup.name, schema: ClassGroupSchema },
    ]),
  ],
  controllers: [ClassesController, ClassGroupController],
  providers: [ClassesService, ClassGroupService],
})
export class ClassesModule {}
