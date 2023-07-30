import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export default class TypeOrmConfig {
	static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {		
		return {
			name: 'calculator',
			type: 'mysql',
			host: process.env.DATABASE_HOST,
			port: +process.env.PORT,
			database: process.env.DATABASE_NAME,
			username: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			entities: [join(__dirname, '../**', '*.entity.{ts,js}')],
			synchronize: false,
			retryAttempts: 3,
			retryDelay: 3000,
			logging: false,
		};
	}
}

export const TypeOrmAsync: TypeOrmModuleAsyncOptions = {
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: async (
		configService: ConfigService,
	): Promise<TypeOrmModuleAsyncOptions> =>
		TypeOrmConfig.getOrmConfig(configService),
};
