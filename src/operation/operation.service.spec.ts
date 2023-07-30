import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { OperationService } from './operation.service';
import { CommonService } from 'src/common/common.service';
import { Operation } from './entities/operation.entity';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { 
  mockCreateOperationDto,
  mockFindAllOperationResolveSuccess,
  mockFindOneOperationResolveSuccess,
  mockOperation,
  mockOperationRepository
} from '../../test/mocks/operation.mock';

describe('OperationService', () => {
  const mockId = uuid();
  let operationService: OperationService;
  let commonService: CommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperationService,
        { 
					provide: getRepositoryToken(Operation),
					useValue: mockOperationRepository
				},
				CommonService
      ],
      
    }).compile();

    operationService = module.get<OperationService>(OperationService);
    commonService = module.get<CommonService>(CommonService);
  });

  it('should be defined', () => {
    expect(operationService).toBeDefined();
  });

  it('should create a new operation', async () => {
    const operationSpy = jest.spyOn(operationService, 'create');
    const dto = { ...mockCreateOperationDto };

    expect(operationSpy).not.toHaveBeenCalled();
    const result = await operationService.create(dto);

    expect(operationSpy).toHaveBeenCalledWith(dto);
    expect(result).toEqual({
      id: expect.any(String),
      ...mockOperation,
    });
  });

  it('should handle errors when saving the operation: Database error.', async () => {
    const createOperationDto = { ...mockCreateOperationDto };
    const error = new Error('Database error.');
    const operationRepository = { ...mockOperationRepository };   
    const commonServiceSpy = jest.spyOn(commonService, 'handleErrors');

    jest.spyOn(operationRepository, 'save').mockRejectedValue(error);

    await expect(operationService.create(createOperationDto)).rejects.toThrow();

    expect(commonServiceSpy).toHaveBeenCalledWith(
      '[OperationService/create]',
      error,
    );
  });

  it('should find all operations', async () => {
    const operationSpy = jest.spyOn(operationService, 'findAll');
    const filterValue = { isActive: 'true' };
    const mockResult = [...mockFindAllOperationResolveSuccess];

    expect(operationSpy).not.toHaveBeenCalled();
    const result = await operationService.findAll(filterValue);

    expect(operationSpy).toHaveBeenCalledWith(filterValue);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(mockResult.length);
  });

  it('should find all operations isActive=false', async () => {
    const operationSpy = jest.spyOn(operationService, 'findAll');
    const filterValue = { isActive: 'false' };
    const mockResult = [...mockFindAllOperationResolveSuccess];

    expect(operationSpy).not.toHaveBeenCalled();
    const result = await operationService.findAll(filterValue);

    expect(operationSpy).toHaveBeenCalledWith(filterValue);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(mockResult.length);
  });

  it('should handle errors when find all operation: Please check server logs', async () => {
    const filterValue = { isActive: 'true' };
    const error = new Error('Please check server logs');
    const operationRepository = { ...mockOperationRepository };
    const commonServiceSpy = jest.spyOn(commonService, 'handleErrors');

    jest.spyOn(operationRepository, 'find').mockRejectedValue(new InternalServerErrorException('Please check server logs'));
    

    await expect(operationService.findAll(filterValue)).rejects.toThrow();
    await expect(operationService.findAll(filterValue)).rejects.toThrowError(error);

    expect(commonServiceSpy).toHaveBeenCalledWith(
      '[OperationService/findAll]',
      expect.any(Error),
    );
  });

  it('should find one operation by type', async () => {
    const operationSpy = jest.spyOn(operationService, 'findOne');
    const filterValue = 'randmon_image';
    const mockResult = { ...mockFindOneOperationResolveSuccess };

    expect(operationSpy).not.toHaveBeenCalled();
    const result = await operationService.findOne(filterValue);

    expect(operationSpy).toHaveBeenCalledWith(filterValue);
    expect(result).toEqual({
      id: expect.any(String),
      ...mockResult,
    });
  });

  it('should find one operation by id', async () => {
    const operationSpy = jest.spyOn(operationService, 'findOne');
    const filterValue = mockId;
    const mockResult = { ...mockFindOneOperationResolveSuccess };

    expect(operationSpy).not.toHaveBeenCalled();
    const result = await operationService.findOne(filterValue);

    expect(operationSpy).toHaveBeenCalledWith(filterValue);
    expect(result).toEqual({
      id: expect.any(String),
      ...mockResult,
    });
  });

  it('should update one operation', async () => {
    const categorySpy = jest.spyOn(operationService, 'update');
    const updateDto = { ...mockCreateOperationDto };
    updateDto.isActive = false;

    jest.spyOn(mockOperationRepository, 'save').mockImplementation((mockOperation: Operation) => {
      Promise.resolve({
        id: mockId,
        isActive: false,
        ...mockOperation,
      });
    });

    expect(categorySpy).not.toHaveBeenCalled();
    const result = await operationService.update(mockId, updateDto);

    expect(categorySpy).toHaveBeenCalledWith(mockId, updateDto);
    expect(result).toEqual({
      id: expect.any(String),
      isActive: false,
      ...mockOperation,
    });
  });

  it('should remove one operation', async () => {
    const recordSpy = jest.spyOn(operationService, 'remove');

    jest.spyOn(mockOperationRepository, 'save').mockImplementation((mockOperation: Operation) => {
      Promise.resolve({
        id: mockId,
        isDeleted: true,
        ...mockOperation,
      });
    });

    expect(recordSpy).not.toHaveBeenCalled();
    const result = await operationService.remove(mockId);

    expect(recordSpy).toHaveBeenCalledWith(mockId);
    expect(result).toEqual({
      id: expect.any(String),
      isDeleted: true,
      ...mockOperation,
    });
  });

  it('should throw error to remove one operation', async () => {
    expect.assertions(1);
    try {
      jest.spyOn(operationService, 'remove').mockImplementationOnce(()=> {
        throw new NotFoundException(`Internal error.`);
      });

      expect(() => operationService.remove(mockId)).toThrow(Error);
    } catch (error) {
      expect(operationService.remove).toHaveBeenCalledWith(mockId);
      expect(error.response.statusCode).toEqual(400);
      await expect(operationService.remove(mockId)).rejects.toThrowError();
    }

  });

});
