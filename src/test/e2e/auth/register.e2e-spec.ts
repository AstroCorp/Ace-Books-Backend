import * as request from 'supertest';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { MikroORM } from '@mikro-orm/core';
import { EmailsPort, EMAILS_PORT } from '@/domain/auth/ports/emails.port';
import { executeMigrations } from '@/test/e2e/helpers/executeMigrations';
import { setupApp } from '@/test/e2e/helpers/setupApp';
import type { OverrideProvider } from '@/test/e2e/helpers/setupApp';

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

		const overrideProviders: OverrideProvider[] = [
			{
				provider: EMAILS_PORT,
				value: mockEmailsService,
			},
		];

		app = await setupApp(overrideProviders);
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

	it('/register (POST) - Email already exists', async () => {
		const registerData = {
			email: 'test@example.com',
			password: 'Test123!@#',
		};

		const response = await request(app.getHttpServer())
			.post('/auth/register')
			.send(registerData)
			.expect(400);

		expect(response.body).toHaveProperty('message');
		expect(response.body.message).toContain('invalid email');
	});

	afterAll(async () => {
		jest.clearAllMocks();
		if (orm) await orm.close();
		if (app) await app.close();
	});
});
