import { Test, TestingModule } from '@nestjs/testing';
import { ScoreColumnsController } from './score_columns.controller';
import { ScoreColumnsService } from './score_columns.service';

describe('ScoreColumnsController', () => {
  let controller: ScoreColumnsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScoreColumnsController],
      providers: [ScoreColumnsService],
    }).compile();

    controller = module.get<ScoreColumnsController>(ScoreColumnsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
