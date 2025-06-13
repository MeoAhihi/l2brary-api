import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClassGroupService } from './class-group.service';
import { CreateClassGroupDto } from './dto/create-class-group.dto';

@Controller('class-groups')
export class ClassGroupController {
  constructor(private readonly classesGroupService: ClassGroupService) {}

  @Post()
  create(@Body() createClassGroupDto: CreateClassGroupDto) {
    return this.classesGroupService.create(createClassGroupDto);
  }

  @Get()
  findAll() {
    return this.classesGroupService.findAll();
  }
}
