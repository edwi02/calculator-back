import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const dsConfig: DataSourceOptions = {
	name: 'calculator',
	type: 'mysql',
	host: configService.get('DATABASE_HOST'),
	port: +configService.get('DATABASE_PORT'),
	database: configService.get('DATABASE_NAME'),
	username: configService.get('DATABASE_USER'),
	password: configService.get('DATABASE_PASSWORD'),
	entities: ['src/**/*.entity.{ts,js}'],
	migrations: ['src/database/migrations/**.ts'],
	logging: false,
};

export const dataSource = new DataSource(dsConfig);
// npm run m:gen -d src/database/migrations/new-entity
