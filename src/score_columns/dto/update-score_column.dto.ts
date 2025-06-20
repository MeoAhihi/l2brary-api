import { PartialType } from '@nestjs/mapped-types';
import { CreateScoreColumnDto } from './create-score_column.dto';

export class UpdateScoreColumnDto extends PartialType(CreateScoreColumnDto) {}
