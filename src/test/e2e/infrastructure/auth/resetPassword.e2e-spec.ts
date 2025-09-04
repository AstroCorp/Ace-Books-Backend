import * as request from 'supertest';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { HttpStatus } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { executeMigrations } from '@/test/e2e/helpers/executeMigrations';
import { setupApp } from '@/test/e2e/helpers/setupApp';
import { EmailsService } from '@/infrastructure/emails/services/emails.service';

describe('Auth - ResetPasswordController (e2e)', () => {
	let orm: MikroORM;
	let app: NestFastifyApplication;

	beforeAll(async () => {
		orm = await executeMigrations();
		app = await setupApp();
	});

	it('/auth/reset-password (POST) - Successfully reset password', async () => {
		const loginData = {
			email: 'unverified1@example.com',
			password: 'password',
		};

		const loginResponse = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginData)
			.expect(HttpStatus.OK);
		const { access_token } = loginResponse.body;

		let url: URL;

		const spy = jest.spyOn(EmailsService.prototype, 'sendMail').mockImplementation((options) => {
			url = new URL(options.context.url);
			return Promise.resolve();
		});

		await request(app.getHttpServer())
					.post('/auth/send-reset-password-email')
					.send({ email: loginData.email })
					.expect(HttpStatus.OK);

		spy.mockRestore();

		const response = await request(app.getHttpServer())
			.post('/auth/reset-password')
			.send({
				token: url.searchParams.get('token'),
				email: url.searchParams.get('email'),
				password: 'asdQwe123".',
			})
			.set('Authorization', `Bearer ${access_token}`)
			.expect(400);

			console.log(response.body, url.searchParams.get('email'))
	});

	it.todo('/auth/reset-password (POST) - Fail to reset password, invalid token');

	it.todo('/auth/reset-password (POST) - Fail to reset password, invalid password');

	it.todo('/auth/reset-password (POST) - Fail to reset password, invalid email');

	it.todo('/auth/reset-password (POST) - Fail to reset password, email not exists');

	it.todo('/auth/reset-password (POST) - Fail to reset password, revoked token');

	it.todo('/auth/reset-password (POST) - Fail to reset password, expired token');

	afterAll(async () => {
		if (orm) await orm.close();
		if (app) await app.close();
	});
});
