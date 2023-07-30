import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { CalculateService } from './calculate.service';
import { Operation } from 'src/operation/entities/operation.entity';
import { OperationService } from 'src/operation/operation.service';
import { UserBalanceService } from 'src/user-balance/user-balance.service';
import { UserBalance } from 'src/user-balance/entities/user-balance.entity';
import { RecordService } from 'src/record/record.service';
import { Record } from 'src/record/entities/record.entity';
import { CommonService } from 'src/common/common.service';
import { RandomOrgService } from 'src/random-org/random-org.service';
import { mockOperationRepository } from '../../test/mocks/operation.mock';
import { mockRecordRepository } from '../../test/mocks/record.mock';
import { 
  mockUserBalanceRepository
} from '../../test/mocks/user-balance.mock';

describe('CalculateService', () => {
  let service: CalculateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
					useValue: mockUserBalanceRepository
				},
        RecordService,
        { 
					provide: getRepositoryToken(Record),
					useValue: mockRecordRepository
				},
        CommonService,
        RandomOrgService,
        { 
          provide: ConfigService,
          useValue: { Symbol: jest.fn() }
        },
      ],
    }).compile();

    service = module.get<CalculateService>(CalculateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
