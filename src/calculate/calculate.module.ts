import { Module } from '@nestjs/common';
import { CalculateService } from './calculate.service';
import { CalculateController } from './calculate.controller';
import { CommonModule } from 'src/common/common.module';
import { OperationModule } from 'src/operation/operation.module';

@Module({
  imports: [
    CommonModule,
    OperationModule
  ],
  controllers: [CalculateController],
  providers: [CalculateService]
})
export class CalculateModule {}
