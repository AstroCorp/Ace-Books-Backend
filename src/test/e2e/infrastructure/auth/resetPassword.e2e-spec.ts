import * as request from 'supertest';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { HttpStatus } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { executeMigrations } from '@/test/e2e/helpers/executeMigrations';
import { setupApp } from '@/test/e2e/helpers/setupApp';
import { getResetPasswordUrl } from '@/test/e2e/helpers/getResetPasswordUrl';
import { Token } from '@/domain/common/models/Token';

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
		const email = 'unverified1@example.com';
		const newPassword = 'asdQwe123".';

		const url = await getResetPasswordUrl(app, email);

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
				email,
				password: newPassword,
			})
			.expect(HttpStatus.OK);
	});

	it('/auth/reset-password (POST) - Fail to reset password, invalid token', async () => {
		const email = 'unverified2@example.com';
		const newPassword = 'asdQwe123".';

		const resetPasswordResponse = await request(app.getHttpServer())
			.post('/auth/reset-password')
			.send({
				token: 'invalidtoken',
				email,
				password: newPassword,
			})
			.expect(HttpStatus.BAD_REQUEST);

		expect(resetPasswordResponse.body.message).toContain('invalid token');
	});

	it('/auth/reset-password (POST) - Fail to reset password, invalid password', async () => {
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

	it('/auth/reset-password (POST) - Fail to reset password, invalid email', async () => {
		const email = 'invalid';
		const newPassword = 'asdQwe123".';

		const resetPasswordResponse = await request(app.getHttpServer())
			.post('/auth/reset-password')
			.send({
				token: urlForValidation.searchParams.get('token'),
				email,
				password: newPassword,
			})
			.expect(HttpStatus.BAD_REQUEST);

		expect(resetPasswordResponse.body.message).toContain('invalid email');
	});

	it('/auth/reset-password (POST) - Fail to reset password, email not exists', async () => {
		const email = 'notfound@example.com';
		const newPassword = 'asdQwe123".';

		const resetPasswordResponse = await request(app.getHttpServer())
			.post('/auth/reset-password')
			.send({
				token: urlForValidation.searchParams.get('token'),
				email,
				password: newPassword,
			})
			.expect(HttpStatus.BAD_REQUEST);

		expect(resetPasswordResponse.body.message).toContain('email not available');
	});

	it('/auth/reset-password (POST) - Fail to reset password, revoked token', async () => {
		const newPassword = 'asdQwe123".';

		const executeMock = jest.spyOn(Token.prototype, 'isRevoked', 'get').mockReturnValue(true);

		const resetPasswordResponse = await request(app.getHttpServer())
			.post('/auth/reset-password')
			.send({
				token: urlForValidation.searchParams.get('token'),
				email: urlForValidation.searchParams.get('email'),
				password: newPassword,
			})
			.expect(HttpStatus.BAD_REQUEST);

		expect(resetPasswordResponse.body.message).toEqual('invalid token');

		executeMock.mockRestore();
	});

	it('/auth/reset-password (POST) - Fail to reset password, expired token', async () => {
		const newPassword = 'asdQwe123".';

		const executeMock = jest.spyOn(Token.prototype, 'checkIfIsExpired').mockReturnValue(true);

		const resetPasswordResponse = await request(app.getHttpServer())
			.post('/auth/reset-password')
			.send({
				token: urlForValidation.searchParams.get('token'),
				email: urlForValidation.searchParams.get('email'),
				password: newPassword,
			})
			.expect(HttpStatus.BAD_REQUEST);

		expect(resetPasswordResponse.body.message).toEqual('invalid token');

		executeMock.mockRestore();
	});

	afterAll(async () => {
		if (orm) await orm.close();
		if (app) await app.close();
	});
});
