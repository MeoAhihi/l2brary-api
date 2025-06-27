import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from '../members.service';
import { Member } from '../schemas/member.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMemberDto } from '../dto/create-member.dto';
import { UpdateMemberDto } from '../dto/update-member.dto';

describe('MembersService', () => {
  let service: MembersService;
  let memberModel: Model<Member>;

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

  const mockMemberModel = {
    find: jest
      .fn()
      .mockReturnValue({
        exec: jest.fn(),
        select: jest.fn().mockReturnValue({ exec: jest.fn() }),
      }),
    findOne: jest.fn().mockReturnValue({ exec: jest.fn() }),
    findById: jest.fn().mockReturnValue({ exec: jest.fn() }),
    create: jest.fn().mockReturnValue({ exec: jest.fn() }),
    findByIdAndUpdate: jest.fn().mockReturnValue({ exec: jest.fn() }),
    findByIdAndDelete: jest.fn().mockReturnValue({ exec: jest.fn() }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembersService,
        {
          provide: getModelToken(Member.name),
          useValue: mockMemberModel,
        },
      ],
    }).compile();

    service = module.get<MembersService>(MembersService);
    memberModel = module.get<Model<Member>>(getModelToken(Member.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of members', async () => {
      const members = [
        { _id: '1', name: 'John Doe', email: 'john@example.com' },
        { _id: '2', name: 'Jane Doe', email: 'jane@example.com' },
      ];
      mockMemberModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(members),
      });

      const result = await service.findAll();
      expect(result).toEqual(members);
      expect(mockMemberModel.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a member by id', async () => {
      const member = { _id: '1', name: 'John Doe', email: 'john@example.com' };
      mockMemberModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(member),
      });

      const result = await service.findOne('1');
      expect(result).toEqual(member);
      expect(mockMemberModel.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create a new member', async () => {
      const newMember = { _id: '1', ...memberMockData };

      mockMemberModel.create.mockResolvedValue(newMember);

      const result = await service.create(memberMockData);
      expect(result).toEqual(newMember);
      expect(mockMemberModel.create).toHaveBeenCalledWith(memberMockData);
    });
  });

  describe('update', () => {
    it('should update a member', async () => {
      const id = '1';
      const {
        fullName,
        birthday,
        is_male,
        school_class,
        phone_number,
        email,
        password,
        role,
        avatar_url,
      } = memberMockData;
      const updateData = {
        fullName,
        birthday,
        is_male,
        school_class,
        phone_number,
        email,
        password,
        role,
        avatar_url,
      };
      const updatedMember = {
        _id: id,
        name: 'Updated Name',
        email: 'john@example.com',
      };

      mockMemberModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(updatedMember),
      });

      const result = await service.updateInformation(
        id,
        updateData as UpdateMemberDto,
      );
      expect(result).toEqual(updatedMember);
      expect(mockMemberModel.findByIdAndUpdate).toHaveBeenCalledWith(
        id,
        updateData,
        { new: true },
      );
    });
  });

  describe('remove', () => {
    it('should remove a member', async () => {
      const id = '1';
      const deletedMember = {
        _id: id,
        name: 'John Doe',
        email: 'john@example.com',
      };

      mockMemberModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(deletedMember),
      });

      const result = await service.delete(id);
      expect(result).toEqual(deletedMember);
      expect(mockMemberModel.findByIdAndDelete).toHaveBeenCalledWith(id);
    });
  });
});
