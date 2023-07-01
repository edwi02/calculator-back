import { BadRequestException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CommonService } from 'src/common/common.service';

import { mockCreateUserDto, 
	mockLoginUserDto, mockUserRepository,
	mockCreateUserResolveSuccess,
	mockLoginUserResolveSuccess,
	mockLoginUserResolveError
} from '../../test/mocks/auth.mock';
import { User } from './entities/user.entity';

describe('AuthController', () => {
	let controller: AuthController;
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
			controllers: [AuthController],
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

		controller = module.get<AuthController>(AuthController);
		authService = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('register', () => {

		beforeEach( () => {
			authService.register = jest.fn().mockResolvedValue(mockCreateUserResolveSuccess)
		});

		it('should register one user', async () => {
			expect(authService.register).not.toHaveBeenCalled();
			const result = await controller.registerUser(mockCreateUserDto);

			expect(authService.register).toHaveBeenCalledWith(mockCreateUserDto);
			expect(result).toEqual(mockCreateUserResolveSuccess);			
		});

		it('should throw an error code 400', async () => {
			expect(authService.register).not.toHaveBeenCalled();
			jest.spyOn(authService, 'register').mockImplementationOnce(()=> {
				throw new BadRequestException()
			})
			try {
				await controller.registerUser(mockCreateUserDto);
			} catch (error) {
				expect(authService.register).toHaveBeenCalledWith(mockCreateUserDto);
				expect(error.response.statusCode).toEqual(400);
			}
		});
	});

	describe('login', () => {
		beforeEach( () => {
			authService.login = jest.fn().mockResolvedValue(mockLoginUserResolveSuccess)
		});

		it('should login success', async () => {
			expect(authService.login).not.toHaveBeenCalled();
			const result = await controller.loginUser(mockLoginUserDto);
			expect(authService.login).toHaveBeenCalledWith(mockLoginUserDto);
			expect(result).toEqual(mockLoginUserResolveSuccess);			
		});
		it('wrong email, should return "Credentials are not valid."', async () => {
			authService.login = jest.fn().mockResolvedValue(mockLoginUserResolveError)

			expect(authService.login).not.toHaveBeenCalled();
			const loginDto = mockLoginUserDto;
			loginDto.username = 'user@mail.com';
			const result = await controller.loginUser(loginDto);
			expect(authService.login).toHaveBeenCalledWith(loginDto);
			expect(result).toEqual(mockLoginUserResolveError);			
		});

		it('wrong password, should return "Credentials are not valid."', async () => {
			authService.login = jest.fn().mockResolvedValue(mockLoginUserResolveError)

			expect(authService.login).not.toHaveBeenCalled();
			const loginDto = mockLoginUserDto;
			loginDto.password = '123456';
			const result = await controller.loginUser(loginDto);
			expect(authService.login).toHaveBeenCalledWith(loginDto);
			expect(result).toEqual(mockLoginUserResolveError);			
		});
	});
});
