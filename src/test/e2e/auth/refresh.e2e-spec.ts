import * as request from 'supertest';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { HttpStatus } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { executeMigrations } from '@/test/e2e/helpers/executeMigrations';
import { setupApp } from '@/test/e2e/helpers/setupApp';

describe('Auth - RefreshController (e2e)', () => {
	let orm: MikroORM;
	let app: NestFastifyApplication;

	beforeAll(async () => {
		orm = await executeMigrations();

		app = await setupApp([]);
	});

	it('/auth/refresh (POST) - Successfully refresh access token', async () => {
		const loginData = {
			email: 'unverified1@example.com',
			password: 'password',
		};

		const response = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginData)
			.expect(HttpStatus.OK);
		const { refresh_token } = response.body;

		await request(app.getHttpServer())
			.post('/auth/refresh')
			.set('Authorization', `Bearer ${refresh_token}`)
			.expect(HttpStatus.CREATED);
	});

	it('/auth/refresh (POST) - Invalid token', async () => {
		await request(app.getHttpServer())
			.post('/auth/refresh')
			.set('Authorization', 'Bearer invalid_token')
			.expect(HttpStatus.UNAUTHORIZED);
	});

	afterAll(async () => {
		if (orm) await orm.close();
		if (app) await app.close();
	});
});
