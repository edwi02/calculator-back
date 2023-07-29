import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { OperationController } from './operation.controller';
import { OperationService } from './operation.service';

import { 
  mockCreateOperationDto,
  mockFindAllOperationDto,
  mockFindAllOperationResolveSuccess,
  mockFindOneOperationResolveSuccess,
  mockOperationParamId,
  mockOperationRepository 
} from '../../test/mocks/operation.mock';
import { Operation } from './entities/operation.entity';
import { CommonService } from 'src/common/common.service';
import { HttpStatus, InternalServerErrorException } from '@nestjs/common';

describe('OperationController', () => {
  let controller: OperationController;
  let operationService: OperationService;
  
  const operationRepository = mockOperationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperationController],
      providers: [
        OperationService,
				{ 
					provide: getRepositoryToken(Operation),
					useValue: operationRepository
				},
				CommonService,
      ],
    }).compile();

    controller = module.get<OperationController>(OperationController);
    operationService = module.get<OperationService>(OperationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('create', () => {

		beforeEach( () => {
			operationService.create = jest.fn().mockResolvedValue(mockFindOneOperationResolveSuccess);		
		});

		it('should create one operation', async () => {
			expect(operationService.create).not.toHaveBeenCalled();
			const result = await controller.create(mockCreateOperationDto);

			expect(operationService.create).toHaveBeenCalledWith(mockCreateOperationDto);
			expect(result).toEqual(mockFindOneOperationResolveSuccess);
		});

	  it('should throw error 500', async () => {
			expect(operationService.create).not.toHaveBeenCalled();
			jest.spyOn(operationService, 'create').mockImplementationOnce(()=> {
				throw new InternalServerErrorException()
			})
			try {
				await controller.create(mockCreateOperationDto);
			} catch (error) {
				expect(operationService.create).toHaveBeenCalledWith(mockCreateOperationDto);
				expect(error.response.statusCode).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		  });
	});
  
  describe('finOne', () => {
    it('should find one operation', async () => {
      operationService.findOne = jest.fn().mockResolvedValue(mockFindOneOperationResolveSuccess);
			const result = await controller.findOne(mockOperationParamId.id);

			expect(operationService.findOne).toHaveBeenCalledWith(mockOperationParamId.id);
			expect(result).toEqual(mockFindOneOperationResolveSuccess);
		});
  })<

  describe('finAll', () => {
    it('should find one operation', async () => {
      operationService.findAll = jest.fn().mockResolvedValue(mockFindAllOperationResolveSuccess);
			const result = await controller.findAll(mockFindAllOperationDto);

			expect(operationService.findAll).toHaveBeenCalledWith(mockFindAllOperationDto);
			expect(result).toEqual(mockFindAllOperationResolveSuccess);
		});
  })

  describe('udpate', () => {
    it('should update operation', async () => {
      const updateResult = mockFindOneOperationResolveSuccess;
      updateResult.cost = 5;

      operationService.update = jest.fn().mockResolvedValue(updateResult);
			const result = await controller.update(mockOperationParamId.id, mockCreateOperationDto);

			expect(operationService.update).toHaveBeenCalledWith(mockOperationParamId.id, mockCreateOperationDto);
			expect(result).toEqual(updateResult);
		});
  })
  describe('remove', () => {
    it('should remove one operation', async () => {
      const removeResult = mockFindOneOperationResolveSuccess;
      removeResult.isDeleted = true;

      operationService.remove = jest.fn().mockResolvedValue(removeResult);
			const result = await controller.remove(mockOperationParamId.id);

			expect(operationService.remove).toHaveBeenCalledWith(mockOperationParamId.id);
			expect(result).toEqual(removeResult);
		});
  })
  
});
