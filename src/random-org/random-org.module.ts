import { Module } from '@nestjs/common';
import { RandomOrgService } from './random-org.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [RandomOrgService],
  exports: [RandomOrgService]
})
export class RandomOrgModule {}
