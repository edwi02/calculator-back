import { Injectable } from '@nestjs/common';

import { BasicCalculateDto, SquareRootCalculateDto } from './dto';
import { OperationService } from 'src/operation/operation.service';
import { CommonService } from 'src/common/common.service';
import { OperationType } from 'src/common/common.constants';
import { RandomOrgService } from '../random-org/random-org.service';
import { RandomStringCalculateDto } from './dto/random-string-calculate.dto';

@Injectable()
export class CalculateService {
  constructor(
    private readonly operationService: OperationService,
    private readonly commonService: CommonService,
    private readonly randomOrgService: RandomOrgService
  ) {}

  public async additional(basicCalculateDto: BasicCalculateDto) {
    try {
      const { numbers } = basicCalculateDto;
      const result = this.executeBasicOperation(OperationType.addition, ...numbers);
      return {
        result
      };

    } catch (error) {
      this.commonService.handleErrors('[[CalculateService/additional]', error);
    }
  }

  public async subtraction(basicCalculateDto: BasicCalculateDto) {
    try {
      const { numbers } = basicCalculateDto;     
      const result = this.executeBasicOperation(OperationType.subtraction, ...numbers);
      return {
        result
      };

    } catch (error) {
      this.commonService.handleErrors('[[CalculateService/substraction]', error);
    }
  }

  public async multiplication(basicCalculateDto: BasicCalculateDto) {
    try {
      const { numbers } = basicCalculateDto;
      const result = this.executeBasicOperation(OperationType.multiplication, ...numbers);
      return {
        result
      };

    } catch (error) {
      this.commonService.handleErrors('[[CalculateService/multiplication]', error);
    }
  }
   
  public async division(basicCalculateDto: BasicCalculateDto) {
    try {
      const { numbers } = basicCalculateDto;
      const result = this.executeBasicOperation(OperationType.division, ...numbers);
      return {
        result
      };

    } catch (error) {
      this.commonService.handleErrors('[[CalculateService/division]', error);
    }
  }

  public async squareRoot(squareRootCalculateDto: SquareRootCalculateDto) {
    try {
      const { number } = squareRootCalculateDto;
      const result = Math.sqrt(number);
      return {
        result
      };

    } catch (error) {
      this.commonService.handleErrors('[[CalculateService/division]', error);
    }
  }

  public async randomString(dto: RandomStringCalculateDto) {
    try {

      const result = await this.randomOrgService.generateStrings({...dto});
      return {
        result
      };

    } catch (error) {
      this.commonService.handleErrors('[[CalculateService/division]', error);
    }
  }

  private executeBasicOperation(operation: string, ...numbers: number[]): number {
    switch(operation) {
      case OperationType.addition:
        return numbers.reduce((accumulate, number) => accumulate + number, 0);
      case OperationType.subtraction:
        return numbers.reduce((accumulate, number) => accumulate - number, 0);
      case OperationType.multiplication:
        return numbers.reduce((accumulate, number) => accumulate * number, 1);
      case OperationType.division:
        return numbers.reduce((accumulate, number) => accumulate / number);
      default:
        return undefined;
    }
  }

}
