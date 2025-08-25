import * as request from 'supertest';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { HttpStatus } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { executeMigrations } from '@/test/e2e/helpers/executeMigrations';
import { setupApp } from '@/test/e2e/helpers/setupApp';

describe('Auth - LoginController (e2e)', () => {
	let orm: MikroORM;
	let app: NestFastifyApplication;

	beforeAll(async () => {
		orm = await executeMigrations();
		app = await setupApp([]);
	});

	it('/auth/login (POST) - Successfully logged in', async () => {
		const loginData = {
			email: 'unverified1@example.com',
			password: 'password',
		};

		const response = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginData)
			.expect(HttpStatus.OK);

		expect(response.body).toHaveProperty('access_token');
		expect(response.body).toHaveProperty('refresh_token');
		expect(typeof response.body.access_token).toBe('string');
		expect(typeof response.body.refresh_token).toBe('string');
		expect(response.body.access_token.length).toBeGreaterThan(0);
		expect(response.body.refresh_token.length).toBeGreaterThan(0);
	});

	it('/auth/login (POST) - Unauthorized', async () => {
		const loginData = {
			email: 'unverified1@example.com',
			password: 'wrong_password',
		};

		const response = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginData)
			.expect(HttpStatus.UNAUTHORIZED);

		expect(response.body).toHaveProperty('message');
		expect(response.body.message).toBe('Unauthorized');
		expect(response.body.statusCode).toBe(HttpStatus.UNAUTHORIZED);
	});

	afterAll(async () => {
		if (orm) await orm.close();
		if (app) await app.close();
	});
});
