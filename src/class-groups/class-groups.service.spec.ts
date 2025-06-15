import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassGroupsService } from './class-groups.service';
import { ClassGroup } from './entities/class_group.entity';
import { CreateClassGroupDto } from './dto/create-class-group.dto';
import { UpdateClassGroupDto } from './dto/update-class-group.dto';

describe('ClassGroupsService', () => {
  let service: ClassGroupsService;
  let model: Model<ClassGroup>;

  const mockClassGroup = {
    _id: 'someId',
    name: 'Class A',
    description: 'Test class group',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockClassGroupModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassGroupsService,
        {
          provide: getModelToken(ClassGroup.name),
          useValue: mockClassGroupModel,
        },
      ],
    }).compile();

    service = module.get<ClassGroupsService>(ClassGroupsService);
    model = module.get<Model<ClassGroup>>(getModelToken(ClassGroup.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new class group', async () => {
      const createDto: CreateClassGroupDto = {
        name: 'Class A',
      };

      jest.spyOn(model, 'create').mockResolvedValue(mockClassGroup as any);

      const result = await service.create(createDto);
      expect(result).toEqual(mockClassGroup);
    });
  });

  describe('findAll', () => {
    it('should return an array of class groups', async () => {
      jest.spyOn(model, 'find').mockResolvedValue([mockClassGroup] as any);

      const result = await service.findAll();
      expect(result).toEqual([mockClassGroup]);
    });
  });

  describe('findOne', () => {
    it('should return a single class group', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(mockClassGroup as any);

      const result = await service.findOne('someId');
      expect(result).toEqual(mockClassGroup);
    });

    it('should return null if class group is not found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(null);

      const result = await service.findOne('nonexistentId');
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a class group', async () => {
      const updateDto: UpdateClassGroupDto = {
        name: 'Updated Class A',
      };

      const updatedClassGroup = { ...mockClassGroup, ...updateDto };
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockResolvedValue(updatedClassGroup as any);

      const result = await service.update('someId', updateDto);
      expect(result).toEqual(updatedClassGroup);
    });
  });

  describe('remove', () => {
    it('should remove a class group', async () => {
      jest
        .spyOn(model, 'findByIdAndDelete')
        .mockResolvedValue(mockClassGroup as any);

      const result = await service.remove('someId');
      expect(result).toEqual(mockClassGroup);
    });

    it('should return null if class group to remove is not found', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(null);

      const result = await service.remove('nonexistentId');
      expect(result).toBeNull();
    });
  });
});
