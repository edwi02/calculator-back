import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { mockCreateUserDto } from './mocks/auth.mock';



describe('AuthController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		app.useGlobalPipes(
			new ValidationPipe({
			  whitelist: true, 
			  forbidNonWhitelisted: true
			})
		  );
		await app.init();
	});

	xit('should create a new user (POST)', async () => {
		// console.log(mockCreateUserDto);
		const response = await request(app.getHttpServer())
		.post('/auth/register')
		.send(mockCreateUserDto);
		
		expect(response.statusCode).toEqual(HttpStatus.CREATED);
	});

	it('should not create a new user: username must be an email (POST)', async () => {
		const userDto = mockCreateUserDto;
		userDto.username = "EdQ";
		const response = await request(app.getHttpServer())
		.post('/auth/register')
		.send(userDto);

		expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
		expect(response.body).toBeDefined();
		expect(response.body).toBeTruthy();
		expect(response.body.message[0]).toEqual('username must be an email');

	});
});