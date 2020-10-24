import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Para poder usar services en los validadores
	useContainer(app.select(AppModule), { 
		fallbackOnErrors: true 
	});

	// Validadores activados por defecto
	app.useGlobalPipes(new ValidationPipe());

	await app.listen(process.env.PORT || 3000);
}

bootstrap();
