import * as request from "supertest";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { HttpStatus } from "@nestjs/common";
import { MikroORM } from "@mikro-orm/core";
import { executeMigrations } from "@/test/e2e/helpers/executeMigrations";
import { setupApp } from "@/test/e2e/helpers/setupApp";
import { GenerateVerificationAccountUrlUseCase } from "@/application/users/useCases/generateVerificationAccountUrlUseCase";
import HashService from "@/infrastructure/auth/services/hash.service";
import SignService from "@/infrastructure/auth/services/sign.service";
import { User } from "@/domain/common/models/User";

describe('User - VerifyAccountController (e2e)', () => {
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
		const body = {
			email: urlSigned.searchParams.get('email'),
			hash: urlSigned.searchParams.get('hash'),
		};
		const expires = urlSigned.searchParams.get('expires');
		const signature = urlSigned.searchParams.get('signature');

		await request(app.getHttpServer())
			.post(`/users/verify-account?expires=${expires}&signature=${signature}`)
			.send(body)
			.expect(HttpStatus.OK);

		const loginResponse = await request(app.getHttpServer())
			.post('/auth/login')
			.send({
				email: user.email,
				password: user.password,
			})
			.expect(HttpStatus.OK);
		const { access_token } = loginResponse.body;

		const profileResponse = await request(app.getHttpServer())
			.get('/users/profile')
			.set('Authorization', `Bearer ${access_token}`)
			.expect(HttpStatus.OK);

		expect(profileResponse.body.isVerified).toBeTruthy();
	});

	it('/users/verify-account (POST) - Invalid signature', async () => {
		const body = {
			userId: 1,
			hash: 'hash_random',
		};

		await request(app.getHttpServer())
			.post('/users/verify-account?sign=fake')
			.send(body)
			.expect(HttpStatus.FORBIDDEN);
	});

	it('/users/verify-account (POST) - User not found exception', async () => {
		const nonExistentUser = new User({
			id: 999,
			email: 'nonexistent@example.com',
			password: 'password',
			avatar: 'avatar',
			isAdmin: false,
			isVerified: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		const generateVerificationAccountUrlUseCase = new GenerateVerificationAccountUrlUseCase(new HashService(), new SignService());
		const urlSigned = generateVerificationAccountUrlUseCase.execute(nonExistentUser);
		const body = {
			email: urlSigned.searchParams.get('email'),
			hash: urlSigned.searchParams.get('hash'),
		};
		const expires = urlSigned.searchParams.get('expires');
		const signature = urlSigned.searchParams.get('signature');

		await request(app.getHttpServer())
			.post(`/users/verify-account?expires=${expires}&signature=${signature}`)
			.send(body)
			.expect(HttpStatus.BAD_REQUEST);
	});

	afterAll(async () => {
		if (orm) await orm.close();
		if (app) await app.close();
	});
});
