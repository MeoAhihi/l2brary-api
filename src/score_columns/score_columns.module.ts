import { Module } from '@nestjs/common';
import { ScoreColumnsService } from './score_columns.service';
import { ScoreColumnsController } from './score_columns.controller';
import { ScoreColumn, ScoreColumnSchema } from './entities/score_column.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ScoreColumn.name, schema: ScoreColumnSchema },
    ]),
  ],
  controllers: [ScoreColumnsController],
  providers: [ScoreColumnsService],
})
export class ScoreColumnsModule {}
