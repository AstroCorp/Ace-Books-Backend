import * as request from 'supertest';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { HttpStatus } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { executeMigrations } from '@/test/e2e/helpers/executeMigrations';
import { setupApp } from '@/test/e2e/helpers/setupApp';
import { SendVerificationEmailUseCase } from '@/application/emails/useCases/sendVerificationEmailUseCase';
import { User } from '@/domain/common/models/User';
import EmailSendFailedException, { EMAIL_SEND_FAILED_EXCEPTION } from '@/domain/emails/exceptions/emailSendFailed.exception';
import UserAlreadyVerifiedException, { USER_ALREADY_VERIFIED_EXCEPTION } from '@/domain/emails/exceptions/userAlreadyVerified.exception';

describe('Users - SendVerifyAccountEmailController (e2e)', () => {
	let orm: MikroORM;
	let app: NestFastifyApplication;

	beforeAll(async () => {
		orm = await executeMigrations();
		app = await setupApp();
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('/users/send-verify-account-email (POST) - Successfully resend verify account email', async () => {
		const loginData = {
			email: 'unverified1@example.com',
			password: 'password',
		};

		const response = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginData)
			.expect(HttpStatus.OK);
		const { access_token } = response.body;

		await request(app.getHttpServer())
			.post('/users/send-verify-account-email')
			.set('Authorization', `Bearer ${access_token}`)
			.expect(HttpStatus.OK);
	});

	it('/users/send-verify-account-email (POST) - Unauthorized', async () => {
		await request(app.getHttpServer())
			.post('/users/send-verify-account-email')
			.expect(HttpStatus.UNAUTHORIZED);
	});

	it('/users/send-verify-account-email (POST) - User already verified', async () => {
		const loginData = {
			email: 'verified1@example.com',
			password: 'password',
		};

		const executeMock = jest
			.spyOn(SendVerificationEmailUseCase.prototype, 'execute')
			.mockImplementation((user: User) => {
				if (user.email === loginData.email) {
					throw new UserAlreadyVerifiedException(user.id);
				}

				return Promise.resolve();
			});

		const loginResponse = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginData)
			.expect(HttpStatus.OK);
		const { access_token } = loginResponse.body;

		const response = await request(app.getHttpServer())
			.post('/users/send-verify-account-email')
			.set('Authorization', `Bearer ${access_token}`)
			.expect(HttpStatus.BAD_REQUEST);

		expect(response.body).toHaveProperty('code');
		expect(response.body.code).toBe(USER_ALREADY_VERIFIED_EXCEPTION);

		expect(executeMock).toHaveBeenCalledWith(
			expect.objectContaining({
				email: loginData.email,
			}),
			expect.any(URL),
		);
		expect(executeMock).toHaveBeenCalledTimes(1);
	});

	it('/users/send-verify-account-email (POST) - Email send failed', async () => {
		const loginData = {
			email: 'unverified2@example.com',
			password: 'password',
		};

		const executeMock = jest
			.spyOn(SendVerificationEmailUseCase.prototype, 'execute')
			.mockImplementation((user: User) => {
				if (user.email === loginData.email) {
					throw new EmailSendFailedException(user.id, 'Mock error');
				}

				return Promise.resolve();
			});

		const loginResponse = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginData)
			.expect(HttpStatus.OK);
		const { access_token } = loginResponse.body;

		const response = await request(app.getHttpServer())
			.post('/users/send-verify-account-email')
			.set('Authorization', `Bearer ${access_token}`)
			.expect(HttpStatus.INTERNAL_SERVER_ERROR);

		expect(response.body).toHaveProperty('code');
		expect(response.body.code).toBe(EMAIL_SEND_FAILED_EXCEPTION);

		expect(executeMock).toHaveBeenCalledWith(
			expect.objectContaining({
				email: loginData.email,
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
