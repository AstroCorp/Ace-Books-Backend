import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	// Documentación de la API con Swagger
	const config = new DocumentBuilder()
		.setTitle('Ace Books')
		.setDescription('Ace Books - API')
		.setVersion('1.0')
		.addTag('auth')
		.addTag('users')
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document, {
		swaggerOptions: {
			filter: true,
			showRequestDuration: true,
		},
	});

	// Para comprimir las respuestas del servidor
	app.use(compression());

	// Middlewares de seguridad
	app.use(helmet());

	// Para evitar ataques de fuerza bruta
	app.use(
		rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutos
			max: 100, // limitar peticiones por IP a 100 según el tiempo en windowMs
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
