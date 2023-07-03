import { Injectable } from '@nestjs/common';
import { BasicCalculateDto, SquareRootCalculateDto } from './dto';
import { OperationService } from 'src/operation/operation.service';
import { CommonService } from 'src/common/common.service';
import { OperationType } from 'src/common/common.constants';

@Injectable()
export class CalculateService {
  constructor(
    private readonly operationService: OperationService,
    private readonly commonService: CommonService
  ) {}

  public async additional(basicCalculateDto: BasicCalculateDto) {
    try {
      const { numbers } = basicCalculateDto;
      return this.executeBasicOperation(OperationType.addition, ...numbers);

    } catch (error) {
      this.commonService.handleErrors('[[CalculateService/additional]', error);
    }
  }

  public async subtraction(basicCalculateDto: BasicCalculateDto) {
    try {
      const { numbers } = basicCalculateDto;     
      return this.executeBasicOperation(OperationType.subtraction, ...numbers);

    } catch (error) {
      this.commonService.handleErrors('[[CalculateService/substraction]', error);
    }
  }

  public async multiplication(basicCalculateDto: BasicCalculateDto) {
    try {
      const { numbers } = basicCalculateDto;
      return this.executeBasicOperation(OperationType.multiplication, ...numbers);

    } catch (error) {
      this.commonService.handleErrors('[[CalculateService/multiplication]', error);
    }
  }
   
  public async division(basicCalculateDto: BasicCalculateDto) {
    try {
      const { numbers } = basicCalculateDto;
      return this.executeBasicOperation(OperationType.division, ...numbers);

    } catch (error) {
      this.commonService.handleErrors('[[CalculateService/division]', error);
    }
  }

  public async squareRoot(squareRootCalculateDto: SquareRootCalculateDto) {
    try {
      const { number } = squareRootCalculateDto;
      return Math.sqrt(number);

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
