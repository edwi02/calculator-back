import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmAsync } from './config/typeorm.config';

import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperationModule } from './operation/operation.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync(TypeOrmAsync),
		CommonModule,
		AuthModule,
		OperationModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
