import { Module } from '@nestjs/common';
import { CalculateService } from './calculate.service';
import { CalculateController } from './calculate.controller';
import { CommonModule } from 'src/common/common.module';
import { OperationModule } from 'src/operation/operation.module';
import { RandomOrgModule } from 'src/random-org/random-org.module';

@Module({
  imports: [
    CommonModule,
    OperationModule,
    RandomOrgModule
  ],
  controllers: [CalculateController],
  providers: [CalculateService]
})
export class CalculateModule {}
