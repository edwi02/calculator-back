import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';

import { CreateRecordDto, FindAllRecordDto } from './dto';
import { CommonService } from 'src/common/common.service';
import { Record } from './entities/record.entity';


@Injectable()
export class RecordService {

  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    private readonly commonService: CommonService
  ) { }

  async create(createRecordDto: CreateRecordDto) {
    try {
      const { userId, operationId, ...toAddData } = createRecordDto;
      
      const record = this.recordRepository.create({
        user: userId,
        operation: operationId,
        ...toAddData
      });
      await this.recordRepository.save(record);

      return {
        ...record
      }
    } catch (error) {
      this.commonService.handleErrors(`[RecordService/create]`, error);
    }
  }

  async findAll(findAllDto: FindAllRecordDto) {
    try {
      const { 
        limitRows = 50,
        offsetRows = 0,
        isActive,
        userId,
        operationId 
      } = findAllDto;

      const where: ObjectLiteral = {};

      if (isActive) {  
        where.isActive = isActive === 'true' ? true : false;
      }
      where.isDeleted = false;

      this.commonService.createWhere(where, 'user', { id: userId }, userId );
      this.commonService.createWhere(where, 'operation', { id: operationId }, operationId );

      const [records, totalRows] = await this.recordRepository.findAndCount({
        relations: {
          user: true,
          operation: true
        },
        where,
        take: limitRows,
        skip: offsetRows,
        order: { date: 'DESC' }
      });

      return {
        pagination: {
          limitRows,
          offsetRows,
          totalRows
        },
        data: [...records]
      };

    } catch (error) {
      this.commonService.handleErrors(`[OperationService/findAll]` ,error);
    }
  }

  async remove(id: string) {
    try {
      const record = await this.recordRepository.preload({
        id,
        isDeleted: true
      });

      this.commonService.emptyFieldValidation(record, `Record with id: ${ id } not found`, HttpStatus.NOT_FOUND);
      await this.recordRepository.save(record);

      return record;
    } catch (error) {
      this.commonService.handleErrors(`[RecordService/update]` ,error);
    }
  }
}
