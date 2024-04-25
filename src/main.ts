import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import fastifyCookie from '@fastify/cookie';
import compression from '@fastify/compress';
import helmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import { AppModule } from "@/app.module";

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

	// CORS
	const whitelist = process.env.NODE_ENV === NodeJS.Environment.Development
		? ['http://localhost:*']
		: ['https://astrocorp.github.io'];

	app.enableCors({
		credentials: true,
		origin: (origin, callback) => {
			if (!origin || whitelist.includes(origin)) {
				return callback(null, true);
			}

			callback(new Error('Not allowed by CORS'));
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

	app.useGlobalPipes(new ValidationPipe());

	await app.listen(process.env.NODE_PORT, '0.0.0.0');
}

bootstrap();
