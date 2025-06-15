import { Test, TestingModule } from '@nestjs/testing';
import { ClassGroupsController } from './class-groups.controller';
import { ClassGroupsService } from './class-groups.service';

describe('ClassGroupsController', () => {
  let controller: ClassGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassGroupsController],
      providers: [ClassGroupsService],
    }).compile();

    controller = module.get<ClassGroupsController>(ClassGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
