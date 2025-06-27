import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from '../members.service';
import { Member } from '../schemas/member.schema';
import { getModelToken } from '@nestjs/mongoose';
import { CreateMemberDto } from '../dto/create-member.dto';

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

const mockSave = jest.fn();
const MockMemberModel = jest.fn().mockImplementation((memberData) => ({
  ...memberData,
  save: mockSave,
}));

describe('MembersService', () => {
  let service: MembersService;
  let mockMemberModel: any;

  beforeEach(async () => {
    mockMemberModel = MockMemberModel;
    mockMemberModel.find = jest.fn().mockReturnThis();
    mockMemberModel.select = jest.fn().mockReturnThis();
    mockMemberModel.exec = jest.fn();
    mockMemberModel.findOne = jest.fn();
    mockMemberModel.findById = jest.fn();
    mockMemberModel.create = jest.fn();
    mockMemberModel.findByIdAndUpdate = jest.fn();
    mockMemberModel.findByIdAndDelete = jest.fn();

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

    mockSave.mockReset();
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
      mockMemberModel.find.mockReturnThis();
      mockMemberModel.select.mockReturnThis();
      mockMemberModel.exec.mockResolvedValueOnce(members);

      const result = await service.findAll();
      expect(result).toEqual(members);
      expect(mockMemberModel.find).toHaveBeenCalled();
      expect(mockMemberModel.select).toHaveBeenCalled();
      expect(mockMemberModel.exec).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a member by id', async () => {
      const member = { _id: '1', name: 'John Doe', email: 'john@example.com' };
      mockMemberModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(member),
      });

      const result = await service.findOne('1');
      expect(result).toEqual(member);
      expect(mockMemberModel.findOne).toHaveBeenCalledWith({ email: '1' });
    });
  });

  describe('create', () => {
    it('should create a new member', async () => {
      const newMember = { _id: '1', ...memberMockData };
      mockSave.mockResolvedValue(newMember);

      const result = await service.create(memberMockData);

      expect(result).toEqual(newMember);
      expect(mockSave).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a member', async () => {
      const id = '1';
      const updateData = { ...memberMockData };
      const updatedMember = {
        _id: id,
        name: 'Updated Name',
        email: 'john@example.com',
      };
      mockMemberModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(updatedMember),
      });

      const result = await service.updateInformation(id, updateData);
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
