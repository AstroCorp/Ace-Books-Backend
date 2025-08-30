import * as request from 'supertest';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { HttpStatus } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { executeMigrations } from '@/test/e2e/helpers/executeMigrations';
import { setupApp } from '@/test/e2e/helpers/setupApp';
import { GenerateVerificationAccountUrlUseCase } from '@/application/users/useCases/generateVerificationAccountUrlUseCase';
import HashService from '@/infrastructure/auth/services/hash.service';
import SignService from '@/infrastructure/auth/services/sign.service';
import { User } from '@/domain/common/models/User';

describe('User - ProfileController (e2e)', () => {
	let orm: MikroORM;
	let app: NestFastifyApplication;

	beforeAll(async () => {
		orm = await executeMigrations();
		app = await setupApp();
	});

	it('/users/verify-account (POST) - Success', async () => {
		const user = new User({
			id: 1,
			email: 'unverified1@example.com',
			password: 'password',
			avatar: 'avatar',
			isAdmin: false,
			isVerified: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		const generateVerificationAccountUrlUseCase = new GenerateVerificationAccountUrlUseCase(new HashService(), new SignService());
		const urlSigned = generateVerificationAccountUrlUseCase.execute(user);
		const body = JSON.parse(urlSigned.searchParams.get('body'));

		const loginResponse = await request(app.getHttpServer())
			.post('/auth/login')
			.send({
				email: user.email,
				password: user.password,
			})
			.expect(HttpStatus.OK);
		const { access_token } = loginResponse.body;

		await request(app.getHttpServer())
			.post(`/users/verify-account${urlSigned.search}`)
			.set('Authorization', `Bearer ${access_token}`)
			.send(body)
			.expect(HttpStatus.OK);

		const profileResponse = await request(app.getHttpServer())
			.get('/users/profile')
			.set('Authorization', `Bearer ${access_token}`)
			.expect(HttpStatus.OK);

		expect(profileResponse.body.isVerified).toBeTruthy();
	});

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
