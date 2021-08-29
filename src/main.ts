import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	// Para comprimir las respuestas del servidor
	app.use(compression());

	// Middlewares de seguridad
	app.use(helmet());

	// Middleware para trabajar con cookies
	app.use(cookieParser());

	// Para evitar ataques de fuerza bruta
	app.use(
		rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutos
			max: 100, // Limitar peticiones por IP a 100 según el tiempo en windowMs
		}),
	);

	app.set('trust proxy', 1);

	// Para poder usar services en los validadores
	useContainer(app.select(AppModule), {
		fallbackOnErrors: true,
	});

	// Validadores activados por defecto
	app.useGlobalPipes(new ValidationPipe());

	await app.listen(process.env.PORT || 3000);
}

bootstrap();
