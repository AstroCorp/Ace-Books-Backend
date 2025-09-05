import * as request from 'supertest';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { HttpStatus } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { executeMigrations } from '@/test/e2e/helpers/executeMigrations';
import { setupApp } from '@/test/e2e/helpers/setupApp';
import { getResetPasswordUrl } from '@/test/e2e/helpers/getResetPasswordUrl';

describe('Auth - ResetPasswordController (e2e)', () => {
	let orm: MikroORM;
	let app: NestFastifyApplication;
	let urlForValidation: URL;

	beforeAll(async () => {
		orm = await executeMigrations();
		app = await setupApp();
		urlForValidation = await getResetPasswordUrl(app, 'unverified2@example.com');
	});

	it('/auth/reset-password (POST) - Successfully reset password', async () => {
		const loginData = {
			email: 'unverified1@example.com',
			password: 'password',
		};
		const newPassword = 'asdQwe123".';

		const url = await getResetPasswordUrl(app, loginData.email);

		const resetPasswordResponse = await request(app.getHttpServer())
			.post('/auth/reset-password')
			.send({
				token: url.searchParams.get('token'),
				email: url.searchParams.get('email'),
				password: newPassword,
			})
			.expect(HttpStatus.OK);

		expect(resetPasswordResponse.body.message).toEqual('password reset successfully');

		await request(app.getHttpServer())
			.post('/auth/login')
			.send({
				email: loginData.email,
				password: newPassword,
			})
			.expect(HttpStatus.OK);
	});

	it('/auth/reset-password (POST) - Fail to reset password, invalid token', async () => {
		const loginData = {
			email: 'unverified2@example.com',
			password: 'password',
		};
		const newPassword = 'asdQwe123".';

		const resetPasswordResponse = await request(app.getHttpServer())
			.post('/auth/reset-password')
			.send({
				token: 'invalidtoken',
				email: loginData.email,
				password: newPassword,
			})
			.expect(HttpStatus.BAD_REQUEST);

		expect(resetPasswordResponse.body.message).toContain('invalid token');
	});

	it('/auth/reset-password (POST) - Fail to reset password, invalid password', async () => {
		const loginData = {
			email: 'unverified2@example.com',
			password: 'password',
		};
		const newPassword = 'invalidPassword';

		const resetPasswordResponse = await request(app.getHttpServer())
			.post('/auth/reset-password')
			.send({
				token: urlForValidation.searchParams.get('token'),
				email: urlForValidation.searchParams.get('email'),
				password: newPassword,
			})
			.expect(HttpStatus.BAD_REQUEST);

		expect(resetPasswordResponse.body.message).toContain('password is not strong enough');
	});

	it.todo('/auth/reset-password (POST) - Fail to reset password, invalid email');

	it.todo('/auth/reset-password (POST) - Fail to reset password, email not exists');

	it.todo('/auth/reset-password (POST) - Fail to reset password, revoked token');

	it.todo('/auth/reset-password (POST) - Fail to reset password, expired token');

	afterAll(async () => {
		if (orm) await orm.close();
		if (app) await app.close();
	});
});
