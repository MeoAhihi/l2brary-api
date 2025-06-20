import { Test, TestingModule } from '@nestjs/testing';
import { ScoreColumnsService } from './score_columns.service';

describe('ScoreColumnsService', () => {
  let service: ScoreColumnsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoreColumnsService],
    }).compile();

    service = module.get<ScoreColumnsService>(ScoreColumnsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
