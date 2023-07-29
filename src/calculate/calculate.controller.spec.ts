import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { CalculateController } from './calculate.controller';
import { CalculateService } from './calculate.service';
import { OperationService } from 'src/operation/operation.service';
import { UserBalanceService } from 'src/user-balance/user-balance.service';
import { RecordService } from 'src/record/record.service';
import { CommonService } from 'src/common/common.service';
import { RandomOrgService } from 'src/random-org/random-org.service';
import { Operation } from 'src/operation/entities/operation.entity';
import { Record } from 'src/record/entities/record.entity';
import { UserBalance } from 'src/user-balance/entities/user-balance.entity';
import { BasicCalculateDto } from './dto';
import { 
  mockOperationRepository
} from '../../test/mocks/operation.mock';
import { 
  mockUser
} from '../../test/mocks/auth.mock';


describe('CalculateController', () => {
  let controller: CalculateController;
  let calculateService: CalculateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculateController],
      providers: [
        CalculateService,
        OperationService,
        { 
					provide: getRepositoryToken(Operation),
					useValue: mockOperationRepository
				},
        UserBalanceService,
        { 
					provide: getRepositoryToken(UserBalance),
					useValue: { Symbol: jest.fn() }
				},
        RecordService,
        { 
					provide: getRepositoryToken(Record),
					useValue: { Symbol: jest.fn() }
				},
        CommonService,
        RandomOrgService,
        { 
          provide: ConfigService,
          useValue: { Symbol: jest.fn() }
        },
      ],
    }).compile();

    controller = module.get<CalculateController>(CalculateController);
    calculateService = module.get<CalculateService>(CalculateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Addition operation', () => {
    beforeEach(() => {
      calculateService.addition = jest.fn().mockResolvedValue([]);
    });

    it('should sum numbers', async () => {
      expect(calculateService.addition).not.toHaveBeenCalled();
      const numbers: BasicCalculateDto = {
        numbers: [1,14,-7]
      };

      const result = await controller.addition(mockUser, numbers);

      expect(calculateService.addition).toHaveBeenCalledWith(mockUser, numbers);
      expect(result).toEqual(expect.any(Array));
    });
  });

});
