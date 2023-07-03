import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './entities/record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Record]),
    CommonModule
  ],
  controllers: [RecordController],
  providers: [RecordService]
})
export class RecordModule {}
