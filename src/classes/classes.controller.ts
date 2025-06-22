import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Controller(':class_group_id/classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Get()
  async findAll(@Param('class_group_id') class_group_id: string) {
    return this.classesService.findAll(class_group_id, {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classesService.update(id, updateClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classesService.remove(id);
  }

  @Post(':id/members')
  addMembers(@Param('id') id: string, @Body() body: any) {
    console.log('ahihi', body);
    return this.classesService.addMembers(id, body.member_ids);
  }
  
  @Delete(':id/members')
  removeMembers(@Param('id') id: string, @Body() body: any) {
    return this.classesService.removeMembers(id, body.member_ids);
  }
}
