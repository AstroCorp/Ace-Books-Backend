import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { Test } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from '@/infrastructure/app/app.module';

export interface OverrideProvider {
	provider: any;
	value: any;
}

export const setupApp = async (overrideProviders: OverrideProvider[]) => {
	const testingModule = Test.createTestingModule({
		imports: [AppModule],
	});

	overrideProviders.forEach(({ provider, value }) => {
		testingModule.overrideProvider(provider).useValue(value);
	});

	const testingModuleCompiled = await testingModule.compile();

	const app = testingModuleCompiled.createNestApplication<NestFastifyApplication>(
		new FastifyAdapter(),
	);

	// Validación con class-validator de forma global
	app.useGlobalPipes(new ValidationPipe());

	// Para poder usar services en los validadores
	useContainer(app.select(AppModule), {
		fallbackOnErrors: true,
	});

	await app.init();
	await app.getHttpAdapter().getInstance().ready();

	return app;
};
