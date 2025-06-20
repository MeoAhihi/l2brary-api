import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateScoreColumnDto } from './dto/create-score_column.dto';
import { UpdateScoreColumnDto } from './dto/update-score_column.dto';
import { ScoreColumnsService } from './score_columns.service';

@Controller('score-columns')
export class ScoreColumnsController {
  constructor(private readonly scoreColumnsService: ScoreColumnsService) {}

  @Post()
  create(@Body() createScoreColumnDto: CreateScoreColumnDto) {
    return this.scoreColumnsService.create(createScoreColumnDto);
  }

  @Get()
  findAll() {
    return this.scoreColumnsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scoreColumnsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScoreColumnDto: UpdateScoreColumnDto,
  ) {
    return this.scoreColumnsService.update(id, updateScoreColumnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scoreColumnsService.remove(id);
  }
}
