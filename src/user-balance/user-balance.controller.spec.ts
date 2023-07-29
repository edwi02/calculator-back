import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserBalanceController } from './user-balance.controller';
import { UserBalanceService } from './user-balance.service';
import { CommonService } from 'src/common/common.service';
import { UserBalance } from './entities/user-balance.entity';
import { 
  mockCreateUserBalanceDto,
  mockUserBalance,
  mockUserBalanceRepository
} from '../../test/mocks/user-balance.mock';
import { mockUser } from '../../test/mocks/auth.mock';

describe('UserBalanceController', () => {
  const mockId = uuid();
  let controller: UserBalanceController;
  let userBalanceService: UserBalanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBalanceController],
      providers: [
        UserBalanceService,
        {
          provide: getRepositoryToken(UserBalance),
          useValue: mockUserBalanceRepository
        },
        CommonService
      ],
    }).compile();

    controller = module.get<UserBalanceController>(UserBalanceController);
    userBalanceService = module.get<UserBalanceService>(UserBalanceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create user-balance', () => {
    beforeEach(() => {
      userBalanceService.create = jest.fn().mockResolvedValue(mockUserBalance);
    });

    it('should create a new record', async () => {
      expect(userBalanceService.create).not.toHaveBeenCalled();

      const result = await controller.create(mockUser(), mockCreateUserBalanceDto);

      expect(userBalanceService.create).toHaveBeenCalledWith(
        mockUser(),
        mockCreateUserBalanceDto,
      );
      expect(result).toEqual(mockUserBalance);
    });
  });

  describe('Find one by user', () => {
    it('should get one user-balance by id', async () => {
      const result = await controller.findOneByUser(mockId);

      expect(result).toEqual(mockUserBalance);
    });

  });

  describe('Update user-balance', () => {
    beforeEach(() => {
      userBalanceService.update = jest.fn().mockResolvedValue(mockUserBalance);
    });

    it('should update a category', async () => {
      const categorySpy = jest.spyOn(userBalanceService, 'update');
      expect(categorySpy).not.toHaveBeenCalled();
      const updateDto = { ...mockCreateUserBalanceDto };
      updateDto.balance = 170;

      const result = await controller.update(
        mockUser(),
        mockId,
        updateDto
      );

      expect(categorySpy).toHaveBeenCalledWith(
        mockUser(),
        mockId,
        updateDto);
      expect(result).toEqual(mockUserBalance);
    });
  });

  describe('Remove user-balance', () => {
    beforeEach(() => {
      userBalanceService.remove = jest.fn().mockResolvedValue(mockUserBalance);
    });

    it('should remove a user-balance', async () => {
      const userBalanceSpy = jest.spyOn(userBalanceService, 'remove');
      expect(userBalanceSpy).not.toHaveBeenCalled();

      const result = await controller.remove(mockId);

      expect(userBalanceSpy).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(mockUserBalance);
    });
  });
});
