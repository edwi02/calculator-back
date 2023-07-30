import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export default class TypeOrmConfig {
	static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {		
		return {
			name: 'calculator',
			type: 'mysql',
			host: configService.get('DATABASE_HOST'),
			port: +configService.get('DATABASE_PORT'),
			database: configService.get('DATABASE_NAME'),
			username: configService.get('DATABASE_USER'),
			password: configService.get('DATABASE_PASSWORD'),
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
