import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { CommonModule } from 'src/common/common.module';
import { JwtStrategy } from './strategies/jwt.strategy';

import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
	imports: [
		ConfigModule,
		CommonModule,
		TypeOrmModule.forFeature([User]),
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
		  imports: [ ConfigModule ],
		  inject: [ ConfigService ],
		  useFactory: ( configService: ConfigService ) => {
	
			return {
			  secret: configService.get('JWT_SECRET'),
			  signOptions: { expiresIn: configService.get('JWT_EXPIRES') }
			}
		  }
		})
	  ],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
  	exports: [AuthService, JwtStrategy, PassportModule, JwtModule, TypeOrmModule]
})
export class AuthModule {}
