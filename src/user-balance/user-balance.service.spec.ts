import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { UserBalanceService } from './user-balance.service';
import { CommonService } from 'src/common/common.service';
import { UserBalance } from './entities/user-balance.entity';
import { mockUser } from '../../test/mocks/auth.mock';
import { 
  mockCreateUserBalanceDto,
  mockUserBalance,
  mockUserBalanceRepository
} from '../../test/mocks/user-balance.mock';
import { NotFoundException } from '@nestjs/common';

describe('UserBalanceService', () => {
  const mockId = uuid();
  let userBalanceService: UserBalanceService;
  let commonService: CommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserBalanceService,
        {
          provide: getRepositoryToken(UserBalance),
          useValue: mockUserBalanceRepository
        },
        CommonService
      ],
    }).compile();

    userBalanceService = module.get<UserBalanceService>(UserBalanceService);
    commonService = module.get<CommonService>(CommonService);
  });

  it('should be defined', () => {
    expect(userBalanceService).toBeDefined();
  });

  it('should create a new user-balance', async () => {
    const recordSpy = jest.spyOn(userBalanceService, 'create');
    const dto = { ...mockCreateUserBalanceDto };

    expect(recordSpy).not.toHaveBeenCalled();
    const result = await userBalanceService.create(mockUser(), dto);

    expect(recordSpy).toHaveBeenCalledWith(mockUser(), dto);
    expect(result).toEqual({
      id: expect.any(String),
      ...mockUserBalance,
    });
  });

  it('should handle errors when saving the user-balance: Database error.', async () => {
    const createUserBalanceDto = { ...mockCreateUserBalanceDto };
    const error = new Error('Database error.');
    const UserBalanceRepository = { ...mockUserBalanceRepository };   
    const commonServiceSpy = jest.spyOn(commonService, 'handleErrors');

    jest.spyOn(UserBalanceRepository, 'save').mockRejectedValue(error);

    await expect(userBalanceService.create(mockUser(), createUserBalanceDto)).rejects.toThrow();

    expect(commonServiceSpy).toHaveBeenCalledWith(
      '[UserBalanceService/create]',
      error,
    );
  });

  it('should find one user-balance by id', async () => {
    const categorySpy = jest.spyOn(userBalanceService, 'findOneByUser');
    const filterValue = mockId;

    expect(categorySpy).not.toHaveBeenCalled();
    const result = await userBalanceService.findOneByUser(filterValue);

    expect(categorySpy).toHaveBeenCalledWith(filterValue);
    expect(result).toEqual({
      id: expect.any(String),
      ...mockUserBalance,
    });
  });

  it('should update one user-balance', async () => {
    const categorySpy = jest.spyOn(userBalanceService, 'update');
    const updateDto = { ...mockCreateUserBalanceDto };
    updateDto.balance = 200;

    jest.spyOn(mockUserBalanceRepository, 'save').mockImplementation((mockUserBalance: UserBalance) => {
      Promise.resolve({
        id: mockId,
        ...mockUserBalance,
      });
    });

    expect(categorySpy).not.toHaveBeenCalled();
    const result = await userBalanceService.update(mockUser(), mockId, updateDto);

    expect(categorySpy).toHaveBeenCalledWith(mockUser(), mockId, updateDto);
    expect(result).toEqual({
      id: expect.any(String),
      balance: expect.any(Number),
      ...mockUserBalance,
    });
  });

  it('should remove one user-balance', async () => {
    const recordSpy = jest.spyOn(userBalanceService, 'remove');

    jest.spyOn(mockUserBalanceRepository, 'save').mockImplementation((mockUserBalance: UserBalance) => {
      Promise.resolve({
        id: mockId,
        isDeleted: true,
        ...mockUserBalance,
      });
    });

    expect(recordSpy).not.toHaveBeenCalled();
    const result = await userBalanceService.remove(mockId);

    expect(recordSpy).toHaveBeenCalledWith(mockId);
    expect(result).toEqual({
      id: expect.any(String),
      isDeleted: true,
      ...mockUserBalance,
    });
  });

  it('should throw error to remove one user-balance', async () => {
    expect.assertions(1);
    try {
      jest.spyOn(userBalanceService, 'remove').mockImplementationOnce(()=> {
        throw new NotFoundException(`Internal error.`);
      });

      expect(() => userBalanceService.remove(mockId)).toThrow(Error);
    } catch (error) {
      expect(userBalanceService.remove).toHaveBeenCalledWith(mockId);
      expect(error.response.statusCode).toEqual(400);
      await expect(userBalanceService.remove(mockId)).rejects.toThrowError();
    }

  });
});
