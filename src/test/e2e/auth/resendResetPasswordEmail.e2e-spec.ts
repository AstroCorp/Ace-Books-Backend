import * as request from 'supertest';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { MikroORM } from '@mikro-orm/core';
import { executeMigrations } from '@/test/e2e/helpers/executeMigrations';
import { OverrideProvider, setupApp } from '@/test/e2e/helpers/setupApp';
import { SendResetPasswordEmailUseCase } from '@/application/auth/useCases/sendResetPasswordEmailUseCase';

// Mock de SendResetPasswordEmailUseCase
const mockSendResetPasswordEmailUseCase = {
	execute: jest.fn().mockResolvedValue(Promise.resolve()),
}

describe('AuthController - Resend reset password email (e2e)', () => {
	let orm: MikroORM;
	let app: NestFastifyApplication;

	beforeAll(async () => {
		orm = await executeMigrations();

		const overrideProviders: OverrideProvider[] = [
			{
				provider: SendResetPasswordEmailUseCase,
				value: mockSendResetPasswordEmailUseCase,
			},
		];

		app = await setupApp(overrideProviders);
	});

	it('/resend-reset-password-email (POST) - Successfully resend reset password email', async () => {
		const userEmail = 'unverified@example.com';

		await request(app.getHttpServer())
			.post('/auth/resend-reset-password-email')
			.send({ email: userEmail })
			.expect(200);
	});

	it('/resend-reset-password-email (POST) - User not found', async () => {
		const userEmail = 'not-found@example.com';

		await request(app.getHttpServer())
			.post('/auth/resend-reset-password-email')
			.send({ email: userEmail })
			.expect(200);
	});

	afterAll(async () => {
		jest.clearAllMocks();
		if (orm) await orm.close();
		if (app) await app.close();
	});
});
