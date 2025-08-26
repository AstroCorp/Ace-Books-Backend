import * as request from 'supertest';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { HttpStatus } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { executeMigrations } from '@/test/e2e/helpers/executeMigrations';
import { setupApp } from '@/test/e2e/helpers/setupApp';
import { Token } from '@/domain/common/models/Token';

describe('Auth - RefreshController (e2e)', () => {
	let orm: MikroORM;
	let app: NestFastifyApplication;

	beforeAll(async () => {
		orm = await executeMigrations();

		app = await setupApp([]);
	});

	it('/auth/refresh (POST) - No need refresh token', async () => {
		const loginData = {
			email: 'unverified1@example.com',
			password: 'password',
		};

		const loginResponse = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginData)
			.expect(HttpStatus.OK);
		const { refresh_token } = loginResponse.body;

		const response = await request(app.getHttpServer())
			.post('/auth/refresh')
			.set('Authorization', `Bearer ${refresh_token}`)
			.expect(HttpStatus.CREATED);

		expect(response.body).toHaveProperty('access_token');
		expect(response.body).toHaveProperty('refresh_token');
		expect(response.body.refresh_token).toEqual(refresh_token);
	});

	it('/auth/refresh (POST) - Need refresh token', async () => {
		jest.spyOn(Token.prototype, 'checkIfNeedsRefresh').mockReturnValue(true);

		const loginData = {
			email: 'unverified1@example.com',
			password: 'password',
		};

		const loginResponse = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginData)
			.expect(HttpStatus.OK);
		const { refresh_token } = loginResponse.body;

		const response = await request(app.getHttpServer())
			.post('/auth/refresh')
			.set('Authorization', `Bearer ${refresh_token}`)
			.expect(HttpStatus.CREATED);

		expect(response.body).toHaveProperty('access_token');
		expect(response.body).toHaveProperty('refresh_token');
		expect(response.body.refresh_token).not.toEqual(refresh_token);
	});

	it('/auth/refresh (POST) - Invalid token', async () => {
		await request(app.getHttpServer())
			.post('/auth/refresh')
			.set('Authorization', 'Bearer invalid_token')
			.expect(HttpStatus.UNAUTHORIZED);
	});

	afterAll(async () => {
		jest.clearAllMocks();
		if (orm) await orm.close();
		if (app) await app.close();
	});
});
