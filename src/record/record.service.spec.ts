import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { RecordService } from './record.service';
import { Record } from './entities/record.entity';
import { CommonService } from 'src/common/common.service';
import { 
  mockCreateRecordDto,
  mockFindAllRecordDto,
  mockRecord,
  mockRecordRepository
} from '../../test/mocks/record.mock';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('RecordService', () => {
  const mockId = uuid();
  let recordService: RecordService;
  let commonService: CommonService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecordService,
        {
          provide: getRepositoryToken(Record),
          useValue: mockRecordRepository
        },
        CommonService
      ],
    }).compile();

    recordService = module.get<RecordService>(RecordService);
    commonService = module.get<CommonService>(CommonService);
  });

  it('should be defined', () => {
    expect(recordService).toBeDefined();
  });

  it('should create a new record', async () => {
    const recordSpy = jest.spyOn(recordService, 'create');
    const dto = { ...mockCreateRecordDto };

    expect(recordSpy).not.toHaveBeenCalled();
    const result = await recordService.create(dto);

    expect(recordSpy).toHaveBeenCalledWith(dto);
    expect(result).toEqual({
      id: expect.any(String),
      ...mockRecord,
    });
  });

  it('should handle errors when saving the record: Database error.', async () => {
    const createRecordDto = { ...mockCreateRecordDto };
    const error = new Error('Database error.');
    const recordRepository = { ...mockRecordRepository };   
    const commonServiceSpy = jest.spyOn(commonService, 'handleErrors');

    jest.spyOn(recordRepository, 'save').mockRejectedValue(error);

    await expect(recordService.create(createRecordDto)).rejects.toThrow();

    expect(commonServiceSpy).toHaveBeenCalledWith(
      '[RecordService/create]',
      error,
    );
  });

  xit('should find records', async () => {
    const recordSpy = jest.spyOn(recordService, 'findAll');
    const filterDto = { ...mockFindAllRecordDto };

    expect(recordSpy).not.toHaveBeenCalled();

    const result = await recordService.findAll(filterDto);

    expect(recordSpy).toHaveBeenCalledWith(filterDto);
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data.length).toEqual(filterDto.limitRows);
  });

  it('should handle errors when find all the categories: Please check server logs', async () => {
    const filterDto = { ...mockFindAllRecordDto };
    const error = new Error('Please check server logs');
    const recordRepository = { ...mockRecordRepository };
    const commonServiceSpy = jest.spyOn(commonService, 'handleErrors');

    jest.spyOn(recordRepository, 'findAndCount').mockRejectedValue(new InternalServerErrorException('Please check server logs'));

    await expect(recordService.findAll(filterDto)).rejects.toThrow();
    await expect(recordService.findAll(filterDto)).rejects.toThrowError(error);

    expect(commonServiceSpy).toHaveBeenCalledWith(
      '[OperationService/findAll]',
      expect.any(Error),
    );
  });

  it('should remove one record', async () => {
    const recordSpy = jest.spyOn(recordService, 'remove');

    jest.spyOn(mockRecordRepository, 'save').mockImplementation((mockRecord: Record) => {
      Promise.resolve({
        id: mockId,
        isDeleted: true,
        ...mockRecord,
      });
    });

    expect(recordSpy).not.toHaveBeenCalled();
    const result = await recordService.remove(mockId);

    expect(recordSpy).toHaveBeenCalledWith(mockId);
    expect(result).toEqual({
      id: expect.any(String),
      isDeleted: true,
      ...mockRecord,
    });
  });

  it('should throw error to remove one record', async () => {
    expect.assertions(1);
    try {
      jest.spyOn(recordService, 'remove').mockImplementationOnce(()=> {
        throw new NotFoundException(`Internal error.`);
      });

      expect(() => recordService.remove(mockId)).toThrow(Error);
    } catch (error) {
      expect(recordService.remove).toHaveBeenCalledWith(mockId);
      expect(error.response.statusCode).toEqual(400);
      await expect(recordService.remove(mockId)).rejects.toThrowError();
    }

  });


});
