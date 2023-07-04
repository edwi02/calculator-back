import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from 'src/common/common.module';

import { UserBalance } from './entities/user-balance.entity';
import { UserBalanceService } from './user-balance.service';
import { UserBalanceController } from './user-balance.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserBalance]),
    AuthModule,
    CommonModule
  ],
  controllers: [UserBalanceController],
  providers: [UserBalanceService],
  exports: [UserBalanceService]
})
export class UserBalanceModule {}
