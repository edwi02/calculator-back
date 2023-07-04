import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserBalanceDto } from './dto/create-user-balance.dto';
import { UpdateUserBalanceDto } from './dto/update-user-balance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { UserBalance } from './entities/user-balance.entity';
import { CommonService } from 'src/common/common.service';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class UserBalanceService {

  constructor(
    @InjectRepository(UserBalance)
    private readonly userBalanceRepository: Repository<UserBalance>,
    private readonly commonService: CommonService
  ) { }

  private readonly logger = new Logger()

  async create(user: User, createUserBalanceDto: CreateUserBalanceDto) {
    try {
      const { userId, balance } = createUserBalanceDto;

      // TODO: Log database
      this.logger.log(`Add balance: ${ balance } to user ${ userId }. UserId Authorization: ${ user.id }. `);

      const userBalance = this.userBalanceRepository.create({
        user: userId,
        balance
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

    try {
     
      const where: ObjectLiteral = {};
      
      this.commonService.createWhere(where, 'user', { id: userId }, userId );
  
      where.isDeleted = false;
  
      const userBalance = await this.userBalanceRepository.findOne({
        where
      });
      
      this.commonService.emptyFieldValidation(userBalance, `User doesn't have balance.`, HttpStatus.NOT_FOUND);
      
      return userBalance;
    } catch (error) {
      this.commonService.handleErrors(`[UserBalanceService/findOneByUser]`, error);
    }
  }

  async update(user: User, id: string, updateUserBalanceDto: UpdateUserBalanceDto) {
    try {
      const { balance } = updateUserBalanceDto;

      // Valid user exits
      await this.findOneByUser(id);

      const userBalance = await this.userBalanceRepository.preload({
        id,
        isDeleted: false,
        balance
      });

      // TODO: Log database
      this.logger.log(`Add balance: ${ balance } to user ${ id }. UserId Authorization: ${ user.id }. `);

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
      this.commonService.handleErrors(`[UserBalanceService/remove]` ,error);
    }
  }
}
