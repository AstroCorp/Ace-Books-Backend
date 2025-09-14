import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { Test } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from '@/infrastructure/app/app.module';

export const setupApp = async () => {
	const testingModule = Test.createTestingModule({
		imports: [AppModule],
	});

	const testingModuleCompiled = await testingModule.compile();

	const app = testingModuleCompiled.createNestApplication<NestFastifyApplication>(
		new FastifyAdapter(),
		{
			logger: false,
		},
	);

	// Validación con class-validator de forma global
	app.useGlobalPipes(new ValidationPipe({
		transform: true,
	}));

	// Para poder usar services en los validadores
	useContainer(app.select(AppModule), {
		fallbackOnErrors: true,
	});

	await app.init();
	await app.listen(3002);
	await app.getHttpAdapter().getInstance().ready();

	return app;
};
