import * as request from 'supertest';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { HttpStatus } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { executeMigrations } from '@/test/e2e/helpers/executeMigrations';
import { setupApp } from '@/test/e2e/helpers/setupApp';

describe('User - ProfileController (e2e)', () => {
	let orm: MikroORM;
	let app: NestFastifyApplication;

	beforeAll(async () => {
		orm = await executeMigrations();
		app = await setupApp();
	});

	it.todo('/users/verify-account (POST) - Success');

	it('/users/verify-account (POST) - Invalid signature', async () => {
		const loginData = {
			email: 'unverified1@example.com',
			password: 'password',
		};
		const body = {
			userId: 1,
			hash: 'hash_random',
		};

		const response = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginData)
			.expect(HttpStatus.OK);
		const { access_token } = response.body;

		await request(app.getHttpServer())
			.post('/users/verify-account?sign=fake')
			.set('Authorization', `Bearer ${access_token}`)
			.send(body)
			.expect(HttpStatus.FORBIDDEN);
	});

	it('/users/verify-account (POST) - Invalid token', async () => {
		await request(app.getHttpServer())
			.post('/users/verify-account')
			.set('Authorization', 'Bearer invalid_token')
			.expect(HttpStatus.UNAUTHORIZED);
	});

	afterAll(async () => {
		if (orm) await orm.close();
		if (app) await app.close();
	});
});
