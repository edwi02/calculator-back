import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { CommonService } from 'src/common/common.service';
import { Record } from './entities/record.entity';
import { 
  mockCreateRecordDto,
  mockFindAllRecordDto,
  mockFindAllRecordSuccess,
  mockRecord,
  mockRecordRepository
} from '../../test/mocks/record.mock';

describe('RecordController', () => {
  const mockId = uuid();
  let controller: RecordController;
  let serviceRecord: RecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordController],
      providers: [
        RecordService,
        {
          provide: getRepositoryToken(Record),
          useValue: mockRecordRepository
        },
        CommonService
      ],
    }).compile();

    controller = module.get<RecordController>(RecordController);
    serviceRecord = module.get<RecordService>(RecordService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create record', () => {
    beforeEach(() => {
      serviceRecord.create = jest.fn().mockResolvedValue(mockRecord);
    });

    it('should create a new record', async () => {
      expect(serviceRecord.create).not.toHaveBeenCalled();

      const result = await controller.create(mockCreateRecordDto);

      expect(serviceRecord.create).toHaveBeenCalledWith(
        mockCreateRecordDto,
      );
      expect(result).toEqual(mockRecord);
    });
  });

  describe('Find all records', () => {
    beforeEach(() => {
      serviceRecord.findAll = jest
        .fn()
        .mockResolvedValue(mockFindAllRecordSuccess);
    });

    it('should return three (3) records', async () => {
      const recordSpy = jest.spyOn(serviceRecord, 'findAll');
      expect(recordSpy).not.toHaveBeenCalled();
      const filterDto = { ...mockFindAllRecordDto };
      const result = await controller.findAll(filterDto);

      expect(recordSpy).toHaveBeenCalledWith(filterDto);
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toEqual(filterDto.limitRows);
    });
  });
  describe('Remove record', () => {
    beforeEach(() => {
      serviceRecord.remove = jest.fn().mockResolvedValue(mockRecord);
    });

    it('should remove a record', async () => {
      const recordSpy = jest.spyOn(serviceRecord, 'remove');
      expect(recordSpy).not.toHaveBeenCalled();

      const result = await controller.remove(mockId);

      expect(recordSpy).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(mockRecord);
    });
  });
});
