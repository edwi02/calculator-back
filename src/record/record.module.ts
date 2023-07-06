import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';

import { Record } from './entities/record.entity';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Record]),
    AuthModule,
    CommonModule
  ],
  controllers: [RecordController],
  providers: [RecordService],
  exports: [RecordService]
})
export class RecordModule {}
