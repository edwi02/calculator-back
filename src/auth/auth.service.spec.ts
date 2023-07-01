import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { User } from './entities/user.entity';

import { 
	mockCreateUserDto,
	mockCreateUserResolveSuccess,
	mockLoginUserResolveSuccess,
	mockLoginUserResolveError,
	mockUserRepository, 
	mockLoginUserDto
} from '../../test/mocks/auth.mock';
import { CommonService } from 'src/common/common.service';

describe('AuthService', () => {
	let authService: AuthService;

	const userRepository = mockUserRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
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
			providers: [
				AuthService,
				{ 
					provide: getRepositoryToken(User),
					useValue: userRepository
				},
				CommonService,
				JwtService
			],
		}).compile();

		authService = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(authService).toBeDefined();
	});

	describe('regiter', () => {

		beforeEach( () => {
			authService.register = jest.fn().mockResolvedValue(mockCreateUserResolveSuccess)
		});
		it('should register one user', async () => {
			expect(authService.register).not.toHaveBeenCalled();
			const result = await authService.register(mockCreateUserDto);

			expect(authService.register).toHaveBeenCalledWith(mockCreateUserDto);
			expect(authService.register).toHaveBeenCalled();
			expect(result).toEqual(mockCreateUserResolveSuccess);			
		});

		it('should throw an error code 400', async () => {
			expect(authService.register).not.toHaveBeenCalled();
			jest.spyOn(authService, 'register').mockImplementationOnce(()=> {
				throw new BadRequestException()
			})
			try {
				await authService.register(mockCreateUserDto);
			} catch (error) {
				expect(authService.register).toHaveBeenCalledWith(mockCreateUserDto);
				expect(error.response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
			}
		});
	});

	describe('login', () => {
		beforeEach( () => {
			authService.login = jest.fn().mockResolvedValue(mockLoginUserResolveSuccess)
		});

		it('should login success', async () => {
			expect(authService.login).not.toHaveBeenCalled();
			const result = await authService.login(mockLoginUserDto);
			expect(authService.login).toHaveBeenCalledWith(mockLoginUserDto);
			expect(result).toEqual(mockLoginUserResolveSuccess);			
		});
		it('wrong email, should return "Credentials are not valid."', async () => {
			authService.login = jest.fn().mockResolvedValue(mockLoginUserResolveError)

			expect(authService.login).not.toHaveBeenCalled();
			const loginDto = mockLoginUserDto;
			loginDto.username = 'user@mail.com';
			const result = await authService.login(loginDto);
			expect(authService.login).toHaveBeenCalledWith(loginDto);
			expect(result).toEqual(mockLoginUserResolveError);			
		});

		it('wrong password, should return "Credentials are not valid."', async () => {
			authService.login = jest.fn().mockResolvedValue(mockLoginUserResolveError)

			expect(authService.login).not.toHaveBeenCalled();
			const loginDto = mockLoginUserDto;
			loginDto.password = '123456';
			const result = await authService.login(loginDto);
			expect(authService.login).toHaveBeenCalledWith(loginDto);
			expect(result).toEqual(mockLoginUserResolveError);			
		});
	});
});
