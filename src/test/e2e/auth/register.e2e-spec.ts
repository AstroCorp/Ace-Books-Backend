import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { MikroORM } from '@mikro-orm/core';
import { AppModule } from '../../../app.module';
import { EmailsPort, EMAILS_PORT } from '@/domain/auth/ports/emails.port';
import { executeMigrations } from '../helpers/executeMigrations';

// Mock del servicio de emails
const mockEmailsService: EmailsPort = {
	sendVerifyAccountEmail: jest.fn().mockResolvedValue(Promise.resolve()),
	sendResetPasswordEmail: jest.fn().mockResolvedValue(Promise.resolve()),
};

describe('AuthController - Register (e2e)', () => {
	let orm: MikroORM;
	let app: NestFastifyApplication;

	beforeAll(async () => {
		orm = await executeMigrations();

		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		})
		.overrideProvider(EMAILS_PORT)
		.useValue(mockEmailsService)
		.compile();

		app = moduleFixture.createNestApplication<NestFastifyApplication>(
			new FastifyAdapter(),
		);

		await app.init();
		await app.getHttpAdapter().getInstance().ready();
	});

	it('/register (POST) - Successfully registered', async () => {
		const registerData = {
			email: 'test@example.com',
			password: 'Test123!@#',
		};

		const response = await request(app.getHttpServer())
			.post('/auth/register')
			.send(registerData)
			.expect(201);

		expect(response.body).toHaveProperty('access_token');
		expect(response.body).toHaveProperty('refresh_token');
		expect(typeof response.body.access_token).toBe('string');
		expect(typeof response.body.refresh_token).toBe('string');
		expect(response.body.access_token.length).toBeGreaterThan(0);
		expect(response.body.refresh_token.length).toBeGreaterThan(0);

		expect(mockEmailsService.sendVerifyAccountEmail).toHaveBeenCalledWith(registerData.email);
		expect(mockEmailsService.sendVerifyAccountEmail).toHaveBeenCalledTimes(1);
	});

	afterAll(async () => {
		jest.clearAllMocks();
		if (orm) await orm.close();
		if (app) await app.close();
	});
});
