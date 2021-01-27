import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

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

	// Para poder usar services en los validadores
	useContainer(app.select(AppModule), { 
		fallbackOnErrors: true 
	});

	// Validadores activados por defecto
	app.useGlobalPipes(new ValidationPipe());

	await app.listen(process.env.APP_PORT || 3000);
}

bootstrap();
