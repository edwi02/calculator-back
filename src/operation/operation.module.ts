import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';

import { Operation } from './entities/operation.entity';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Operation]),
    AuthModule,
    ConfigModule,
		CommonModule
  ],
  controllers: [OperationController],
  providers: [OperationService],
  exports: [OperationService]
})
export class OperationModule {}
