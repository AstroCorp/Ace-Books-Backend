import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Para comprimir las respuestas del servidor
	app.use(compression());

	// Middlewares de seguridad
	app.use(helmet());

	// Para poder usar services en los validadores
	useContainer(app.select(AppModule), { 
		fallbackOnErrors: true 
	});

	// Validadores activados por defecto
	app.useGlobalPipes(new ValidationPipe());

	await app.listen(process.env.PORT || 3000);
}

bootstrap();
