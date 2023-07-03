import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';

import { CreateOperationDto, UpdateOperationDto } from './dto';
import { Operation } from './entities/operation.entity';
import { CommonService } from 'src/common/common.service';
import { FindAllOperationDto } from './dto/find-all-operation.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class OperationService {
  constructor(
    @InjectRepository(Operation)
    private readonly operationRepository: Repository<Operation>,
    private readonly commonService: CommonService
  ) { }

  async create(createOperationDto: CreateOperationDto) {
    try {
      const { ...toAddData } = createOperationDto;
      
      const operation = this.operationRepository.create({
        ...toAddData
      });
      await this.operationRepository.save(operation);

      return {
        ...operation
      }
    } catch (error) {
      this.commonService.handleErrors(`[OperationService/create]`, error);
    }
  }

  async findAll(findAllDto: FindAllOperationDto) {
    try {
      const { isActive } = findAllDto;

      const where: ObjectLiteral = {};

      if (isActive) {
        where.isActive = isActive === 'true' ? true : false;
      }
      where.isDeleted = false;

      const operations = await this.operationRepository.find({
        where,
        order: { type: 'ASC' }
      });

      return operations;

    } catch (error) {
      this.commonService.handleErrors(`[OperationService/findAll]` ,error);
    }
  }

  async findOne(value: string) {
    const where: ObjectLiteral = {};
    
    if ( isUUID(value) ) {
      where.id = value;
    } else {
      where.type =  value;
    }

    where.isDeleted = false;

    const operation = await this.operationRepository.findOne({
      where
    });
    
    this.commonService.emptyFieldValidation(operation, `Operation doesn't exist.`, HttpStatus.NOT_FOUND);
    
    return operation;
  }

  async update(id: string, updateOperationDto: UpdateOperationDto) {
    try {
      const operation = await this.operationRepository.preload({
        id,
        isDeleted: false,
        ...updateOperationDto
      });

      this.commonService.emptyFieldValidation(operation, `Operation with id: ${ id } not found`, HttpStatus.NOT_FOUND);
      await this.operationRepository.save(operation);

      return operation;
    } catch (error) {
      this.commonService.handleErrors(`[OperationService/update]` ,error);
    }
  }

  async remove(id: string) {
    try {
      const operation = await this.operationRepository.preload({
        id,
        isDeleted: true
      });

      this.commonService.emptyFieldValidation(operation, `Operation with id: ${ id } not found`, HttpStatus.NOT_FOUND);
      await this.operationRepository.save(operation);

      return operation;
    } catch (error) {
      this.commonService.handleErrors(`[OperationService/update]` ,error);
    }
  }
}
