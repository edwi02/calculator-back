import { Test, TestingModule } from '@nestjs/testing';
import { UserBalanceController } from './user-balance.controller';
import { UserBalanceService } from './user-balance.service';

describe('UserBalanceController', () => {
  let controller: UserBalanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBalanceController],
      providers: [UserBalanceService],
    }).compile();

    controller = module.get<UserBalanceController>(UserBalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
