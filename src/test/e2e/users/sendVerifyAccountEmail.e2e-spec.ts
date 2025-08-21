import * as request from 'supertest';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { MikroORM } from '@mikro-orm/core';
import { executeMigrations } from '@/test/e2e/helpers/executeMigrations';
import { OverrideProvider, setupApp } from '@/test/e2e/helpers/setupApp';
import { SendVerificationEmailUseCase } from '@/application/emails/useCases/sendVerificationEmailUseCase';

// Mock de SendVerificationEmailUseCase
const mockSendVerificationEmailUseCase = {
	execute: jest.fn().mockResolvedValue(Promise.resolve()),
}

describe('Users - SendVerifyAccountEmailController (e2e)', () => {
	let orm: MikroORM;
	let app: NestFastifyApplication;

	beforeAll(async () => {
		orm = await executeMigrations();

		const overrideProviders: OverrideProvider[] = [
			{
				provider: SendVerificationEmailUseCase,
				value: mockSendVerificationEmailUseCase,
			},
		];

		app = await setupApp(overrideProviders);
	});

	it('/users/send-verify-account-email (POST) - Successfully resend verify account email', async () => {
		const loginData = {
			email: 'unverified@example.com',
			password: 'password',
		};

		const response = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginData)
			.expect(201);
		const { access_token } = response.body;

		await request(app.getHttpServer())
			.post('/users/send-verify-account-email')
			.set('Authorization', `Bearer ${access_token}`)
			.expect(200);
	});

	it('/users/send-verify-account-email (POST) - Unauthorized', async () => {
		await request(app.getHttpServer())
			.post('/users/send-verify-account-email')
			.expect(401);
	});

	afterAll(async () => {
		jest.clearAllMocks();
		if (orm) await orm.close();
		if (app) await app.close();
	});
});
