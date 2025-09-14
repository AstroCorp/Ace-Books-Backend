import * as request from "supertest";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { HttpStatus } from "@nestjs/common";
import { MikroORM } from "@mikro-orm/core";
import { executeMigrations } from "@/test/e2e/helpers/executeMigrations";
import { setupApp } from "@/test/e2e/helpers/setupApp";

describe('User - ProfileController (e2e)', () => {
	let orm: MikroORM;
	let app: NestFastifyApplication;

	beforeAll(async () => {
		orm = await executeMigrations();
		app = await setupApp();
	});

	it('/users/profile (GET) - Success', async () => {
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
			.get('/users/profile')
			.set('Authorization', `Bearer ${refresh_token}`)
			.expect(HttpStatus.OK);

		expect(response.body).toHaveProperty('email');
		expect(response.body).toHaveProperty('avatar');
	});

	it('/users/profile (GET) - Invalid token', async () => {
		await request(app.getHttpServer())
			.get('/users/profile')
			.set('Authorization', 'Bearer invalid_token')
			.expect(HttpStatus.UNAUTHORIZED);
	});

	afterAll(async () => {
		if (orm) await orm.close();
		if (app) await app.close();
	});
});
