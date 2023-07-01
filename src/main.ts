import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
  
	const logger = new Logger();
	
	app.setGlobalPrefix('api');
	
	// Security headers
	app.use(helmet());
  
	app.useGlobalPipes(
	  new ValidationPipe({
		whitelist: true, 
		forbidNonWhitelisted: true
	  })
	);
  
	const config = new DocumentBuilder()
	  .setTitle('EdCalculator')
	  .setDescription('API for calculator> Addition, Substraction, Multiplication, Division, Square root and Random String.')
	  .setVersion('1.0.0')
	  .addBearerAuth()
	  .build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	
  
	await app.listen(process.env.PORT);
	logger.log(`App running on port ${ process.env.PORT }`);
}
bootstrap();
