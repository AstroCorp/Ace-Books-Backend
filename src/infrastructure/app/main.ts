import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import compression from '@fastify/compress';
import helmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import { useContainer } from 'class-validator';
import { AppModule } from '@/infrastructure/app/app.module';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

	// CORS
	const whitelist = [NodeJS.Environment.Development, NodeJS.Environment.Testing].includes(process.env.NODE_ENV)
		? ['http://localhost:3000']
		: ['https://ace-books-frontend.vercel.app'];

	app.enableCors({
		credentials: true,
		origin: (origin, callback) => {
			if (!origin || whitelist.includes(origin)) {
				return callback(null, true);
			}

			callback(new Error('Not allowed by CORS'), false);
		},
	});

	// Cookies
	await app.register(fastifyCookie, {
		secret: process.env.COOKIE_SECRET,
	});

	// Comprimir body de las respuestas
	await app.register(compression);

	// Seguridad
	await app.register(helmet);
	await app.register(fastifyCsrf);

	// Validación con class-validator de forma global
	app.useGlobalPipes(new ValidationPipe({
		transform: true,
	}));

	// Para poder usar services en los validadores
	useContainer(app.select(AppModule), {
		fallbackOnErrors: true,
	});

	await app.listen(process.env.NODE_PORT, '0.0.0.0');
}

bootstrap();
