import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClassGroupsService } from './class-groups.service';
import { CreateClassGroupDto } from '../class-groups/dto/create-class-group.dto';

@Controller('class-groups')
export class ClassGroupsController {
  constructor(private readonly classesGroupService: ClassGroupsService) {}

  @Post()
  create(@Body() createClassGroupDto: CreateClassGroupDto) {
    return this.classesGroupService.create(createClassGroupDto);
  }

  @Get()
  findAll() {
    return this.classesGroupService.findAll();
  }
}
