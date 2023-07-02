import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from 'src/common/common.module';

import { Operation } from './entities/operation.entity';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Operation]),
    ConfigModule,
		CommonModule
  ],
  controllers: [OperationController],
  providers: [OperationService]
})
export class OperationModule {}
