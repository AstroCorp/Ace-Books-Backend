import * as request from 'supertest';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { HttpStatus } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { executeMigrations } from '@/test/e2e/helpers/executeMigrations';
import { setupApp } from '@/test/e2e/helpers/setupApp';
import { SendResetPasswordEmailUseCase } from '@/application/emails/useCases/sendResetPasswordEmailUseCase';
import { User } from '@/domain/common/models/User';
import EmailSendFailedException, { EMAIL_SEND_FAILED_EXCEPTION } from '@/domain/emails/exceptions/emailSendFailed.exception';

describe('Auth - SendResetPasswordEmailController (e2e)', () => {
	let orm: MikroORM;
	let app: NestFastifyApplication;

	beforeAll(async () => {
		orm = await executeMigrations();
		app = await setupApp();
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('/auth/send-reset-password-email (POST) - Successfully send reset password email', async () => {
		const userEmail = 'unverified1@example.com';

		await request(app.getHttpServer())
			.post('/auth/send-reset-password-email')
			.send({ email: userEmail })
			.expect(HttpStatus.OK);
	});

	it('/auth/send-reset-password-email (POST) - User not found', async () => {
		const userEmail = 'not-found@example.com';

		await request(app.getHttpServer())
			.post('/auth/send-reset-password-email')
			.send({ email: userEmail })
			.expect(HttpStatus.OK);
	});

	it('/auth/send-reset-password-email (POST) - Email send failed', async () => {
		const userEmail = 'verified1@example.com';

		const executeMock = jest
			.spyOn(SendResetPasswordEmailUseCase.prototype, 'execute')
			.mockImplementation((user: User) => {
				if (user.email === userEmail) {
					throw new EmailSendFailedException(user.id, 'Mock error');
				}

				return Promise.resolve();
			});

		const response = await request(app.getHttpServer())
			.post('/auth/send-reset-password-email')
			.send({ email: userEmail })
			.expect(HttpStatus.INTERNAL_SERVER_ERROR);

		expect(response.body).toHaveProperty('code');
		expect(response.body.code).toBe(EMAIL_SEND_FAILED_EXCEPTION);

		expect(executeMock).toHaveBeenCalledWith(
			expect.objectContaining({
				email: userEmail,
			}),
			expect.any(URL),
		);
		expect(executeMock).toHaveBeenCalledTimes(1);
	});

	afterAll(async () => {
		jest.clearAllMocks();
		if (orm) await orm.close();
		if (app) await app.close();
	});
});
