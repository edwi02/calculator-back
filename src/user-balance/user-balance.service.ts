import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserBalanceDto } from './dto/create-user-balance.dto';
import { UpdateUserBalanceDto } from './dto/update-user-balance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { UserBalance } from './entities/user-balance.entity';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class UserBalanceService {

  constructor(
    @InjectRepository(UserBalance)
    private readonly userBalanceRepository: Repository<UserBalance>,
    private readonly commonService: CommonService
  ) { }

  async create(createUserBalanceDto: CreateUserBalanceDto) {
    try {
      const { userId, ...toAddData } = createUserBalanceDto;
      
      const userBalance = this.userBalanceRepository.create({
        user: userId,
        ...toAddData
      });
      await this.userBalanceRepository.save(userBalance);

      return {
        ...userBalance
      }
    } catch (error) {
      this.commonService.handleErrors(`[UserBalanceService/create]`, error);
    }
  }

  async findOneByUser(userId: string) {
    const where: ObjectLiteral = {};
    
    this.commonService.createWhere(where, 'user', { id: userId }, userId );

    where.isDeleted = false;

    const userBalance = await this.userBalanceRepository.findOne({
      where
    });
    
    this.commonService.emptyFieldValidation(userBalance, `User doesn't have balance.`, HttpStatus.NOT_FOUND);
    
    return userBalance;
  }

  async update(id: string, updateUserBalanceDto: UpdateUserBalanceDto) {
    try {
      const userBalance = await this.userBalanceRepository.preload({
        id,
        isDeleted: false,
        ...updateUserBalanceDto
      });

      this.commonService.emptyFieldValidation(userBalance, `UserBalance with id: ${ id } not found`, HttpStatus.NOT_FOUND);
      await this.userBalanceRepository.save(userBalance);

      return userBalance;
    } catch (error) {
      this.commonService.handleErrors(`[UserBalanceService/update]` ,error);
    }
  }

  async remove(id: string) {
    try {
      const userBalance = await this.userBalanceRepository.preload({
        id,
        isDeleted: true
      });

      this.commonService.emptyFieldValidation(userBalance, `UserBalance with id: ${ id } not found`, HttpStatus.NOT_FOUND);
      await this.userBalanceRepository.save(userBalance);

      return userBalance;
    } catch (error) {
      this.commonService.handleErrors(`[UserBalanceService/update]` ,error);
    }
  }
}
