import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommunicationHubService } from './communication-hub.service';
import { CreateCommunicationHubDto } from './dto/create-communication-hub.dto';
import { UpdateCommunicationHubDto } from './dto/update-communication-hub.dto';

@Controller('communication-hub')
export class CommunicationHubController {
  constructor(private readonly communicationHubService: CommunicationHubService) {}

  @Post()
  create(@Body() createCommunicationHubDto: CreateCommunicationHubDto) {
    return this.communicationHubService.create(createCommunicationHubDto);
  }

  @Get()
  findAll() {
    return this.communicationHubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communicationHubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommunicationHubDto: UpdateCommunicationHubDto) {
    return this.communicationHubService.update(+id, updateCommunicationHubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communicationHubService.remove(+id);
  }
}
