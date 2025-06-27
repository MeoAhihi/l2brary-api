import { Test, TestingModule } from '@nestjs/testing';
import { MembersController } from '../members.controller';
import { MembersService } from '../members.service';
import { CreateMemberDto } from '../dto/create-member.dto';
import { UpdateMemberDto } from '../dto/update-member.dto';

const memberMockData: CreateMemberDto = {
  fullName: 'John Doe',
  birthday: new Date('1990-01-01'),
  is_male: true,
  school_class: '12A',
  phone_number: '+84123456789',
  email: 'john.doe@example.com',
  password: 'password123',
  role: 'student',
  avatar_url: 'https://example.com/avatars/johndoe.jpg',
};

describe('MembersController', () => {
  let controller: MembersController;
  let service: MembersService;

  const mockMembersService = {
    create: jest.fn().mockReturnValue({ exec: jest.fn() }),
    findAll: jest.fn().mockReturnValue({ exec: jest.fn() }),
    findOne: jest.fn().mockReturnValue({ exec: jest.fn() }),
    update: jest.fn().mockReturnValue({ exec: jest.fn() }),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembersController],
      providers: [
        {
          provide: MembersService,
          useValue: mockMembersService,
        },
      ],
    }).compile();

    controller = module.get<MembersController>(MembersController);
    service = module.get<MembersService>(MembersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of members', async () => {
      const expectedResult = [
        {
          ...memberMockData,
        },
        {
          ...memberMockData,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      expect(await controller.findAll()).toBe(expectedResult);
    });
  });

  describe('getById', () => {
    it('should return a single member', async () => {
      const expectedResult = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      expect(await controller.getById('1')).toBe(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  // describe('update', () => {
  //   it('should update a member', async () => {
  //     const updateMemberDto: UpdateMemberDto = {
  //       name: 'John Updated',
  //       email: 'john.updated@example.com',
  //     };
  //     const expectedResult = { id: 1, ...memberMockData };

  //     jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

  //     expect(await controller.updateInfomation('1', memberMockData)).toBe(expectedResult);
  //     expect(service.update).toHaveBeenCalledWith(1, updateMemberDto);
  //   });
  // });

  // describe('remove', () => {
  //   it('should remove a member', async () => {
  //     const expectedResult = {
  //       id: 1,
  //       name: 'John Doe',
  //       email: 'john@example.com',
  //       phoneNumber: '1234567890',
  //     };

  //     jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

  //     expect(await controller.remove('1')).toBe(expectedResult);
  //     expect(service.remove).toHaveBeenCalledWith(1);
  //   });
  // });
});
