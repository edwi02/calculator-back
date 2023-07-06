import { Module } from '@nestjs/common';

import { CommonModule } from 'src/common/common.module';
import { OperationModule } from 'src/operation/operation.module';
import { RandomOrgModule } from 'src/random-org/random-org.module';
import { RecordModule } from 'src/record/record.module';
import { UserBalanceModule } from 'src/user-balance/user-balance.module';

import { CalculateService } from './calculate.service';
import { CalculateController } from './calculate.controller';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    AuthModule,
    CommonModule,
    OperationModule,
    RandomOrgModule,
    RecordModule,
    UserBalanceModule,
  ],
  controllers: [CalculateController],
  providers: [CalculateService]
})
export class CalculateModule {}
