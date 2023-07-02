import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OperationService } from './operation.service';
import { CommonService } from 'src/common/common.service';
import { Operation } from './entities/operation.entity';
import { mockOperationRepository } from '../../test/mocks/operation.mock';

describe('OperationService', () => {
  let operationService: OperationService;

  const userRepository = mockOperationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperationService,
        { 
					provide: getRepositoryToken(Operation),
					useValue: userRepository
				},
				CommonService
      ],
      
    }).compile();

    operationService = module.get<OperationService>(OperationService);
  });

  it('should be defined', () => {
    expect(operationService).toBeDefined();
  });
});
