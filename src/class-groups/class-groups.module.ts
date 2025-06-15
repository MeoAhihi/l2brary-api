import { Module } from '@nestjs/common';
import { ClassGroupsService } from './class-groups.service';
import { ClassGroupsController } from './class-groups.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassGroup, ClassGroupSchema } from './entities/class_group.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClassGroup.name, schema: ClassGroupSchema },
    ]),
  ],
  controllers: [ClassGroupsController],
  providers: [ClassGroupsService],
  exports: [ClassGroupsService],
})
export class ClassGroupsModule {}
