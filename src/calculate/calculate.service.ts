import { Injectable } from '@nestjs/common';

import { BasicCalculateDto, SquareRootCalculateDto } from './dto';
import { OperationService } from 'src/operation/operation.service';
import { CommonService } from 'src/common/common.service';
import { OperationType } from 'src/common/common.constants';
import { RandomOrgService } from '../random-org/random-org.service';
import { RandomStringCalculateDto } from './dto/random-string-calculate.dto';
import { UserBalanceService } from 'src/user-balance/user-balance.service';
import { User } from 'src/auth/entities/user.entity';
import { RecordService } from 'src/record/record.service';
import { CreateRecordDto } from 'src/record/dto';
import { UpdateUserBalanceDto } from 'src/user-balance/dto';

@Injectable()
export class CalculateService {
  constructor(
    private readonly operationService: OperationService,
    private readonly userBalanceService: UserBalanceService,
    private readonly recordService: RecordService,
    private readonly commonService: CommonService,
    private readonly randomOrgService: RandomOrgService
  ) {}

  public async addition(user: User, basicCalculateDto: BasicCalculateDto) {
    try {

      const { numbers } = basicCalculateDto;     
      const result = await this.operationProcess(user, OperationType.addition, numbers);

      return {
        result
      };

    } catch (error) {
      this.commonService.handleErrors('[[CalculateService/additional]', error);
    }
  }

  public async subtraction(user: User, basicCalculateDto: BasicCalculateDto) {
    try {

      const { numbers } = basicCalculateDto;     
      const result = await this.operationProcess(user, OperationType.subtraction, numbers);

      return {
        result
      };

    } catch (error) {
      this.commonService.handleErrors('[[CalculateService/substraction]', error);
    }
  }

  public async multiplication(user: User, basicCalculateDto: BasicCalculateDto) {
    try {
      const { numbers } = basicCalculateDto;     
      const result = await this.operationProcess(user, OperationType.multiplication, numbers);
      return {
        result
      };

    } catch (error) {
      this.commonService.handleErrors('[[CalculateService/multiplication]', error);
    }
  }
   
  public async division(user: User, basicCalculateDto: BasicCalculateDto) {
    try {
      const { numbers } = basicCalculateDto;     
      const result = await this.operationProcess(user, OperationType.division, numbers);
      return {
        result
      };

    } catch (error) {
      this.commonService.handleErrors('[[CalculateService/division]', error);
    }
  }

  public async squareRoot(user: User, squareRootCalculateDto: SquareRootCalculateDto) {
    try {
      const { number } = squareRootCalculateDto;
      const result = Math.sqrt(number).toString();
      await this.operationProcess(user, OperationType.square_root, [], result);
      return {
        result
      };

    } catch (error) {
      this.commonService.handleErrors('[[CalculateService/division]', error);
    }
  }

  public async randomString(user: User, randomStringDto: RandomStringCalculateDto) {
    try {

      const result = await this.randomOrgService.generateStrings({...randomStringDto});
      await this.operationProcess(user, OperationType.random_string, [], result);
      return {
        result
      };

    } catch (error) {
      this.commonService.handleErrors('[[CalculateService/division]', error);
    }
  }

  private async operationProcess(user: User, operationType: OperationType, numbers: number[], resultCompleted?): Promise<string> {
    try {

      const operation = await this.operationService.findOne(operationType);
      const userBalance = await this.userBalanceService.checkUserBalance(user.id, operation.cost);

      let result = resultCompleted;
      if(resultCompleted === undefined){
        result = this.executeBasicOperation(operationType, ...numbers).toString();
      }

      // Save Record
      const createRecorDto: CreateRecordDto = {
        amount: operation.cost, 
        operationId: operation,
        userId: user,
        operationResponse: result.toString(),
        balance: userBalance.balance
      }
      await this.recordService.create(createRecorDto);

      // Update User Balance
      const updateUserBalanceDto: UpdateUserBalanceDto = {
        balance: (userBalance.balance - operation.cost)
      }
      await this.userBalanceService.update(user, userBalance.id, updateUserBalanceDto);

      return result;

    } catch (error) {
      this.commonService.handleErrors('[CalculateService/division]', error);
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
