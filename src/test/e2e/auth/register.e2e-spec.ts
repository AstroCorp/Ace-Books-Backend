import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { MikroORM } from '@mikro-orm/core';
import { DatabaseSeeder } from '@/infrastructure/orm/seeders/DatabaseSeeder';
import config from '@/infrastructure/orm/mikro-orm.config';
import { EMAILS_PORT } from '@/application/auth/ports/tokens';
import { EmailsPort } from '@/application/auth/ports/emails.port';

// Mock del servicio de emails
const mockEmailsService: EmailsPort = {
	sendVerifyAccountEmail: jest.fn().mockResolvedValue(Promise.resolve()),
	sendResetPasswordEmail: jest.fn().mockResolvedValue(Promise.resolve()),
};

describe('AuthController - Register (e2e)', () => {
	let orm: MikroORM;
	let app: NestFastifyApplication;

	beforeAll(async () => {
		orm = await MikroORM.init(config);

		await orm.schema.refreshDatabase();

		await orm.seeder.seed(DatabaseSeeder);

		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		})
		.overrideProvider(EMAILS_PORT)
		.useValue(mockEmailsService)
		.compile();

		app = moduleFixture.createNestApplication<NestFastifyApplication>(
			new FastifyAdapter(),
		);

		await app.init();
		await app.getHttpAdapter().getInstance().ready();
	});

	it('/register (POST) - Registro exitoso', async () => {
		const registerData = {
			email: 'test@example.com',
			password: 'Test123!@#'
		};

		const response = await request(app.getHttpServer())
			.post('/auth/register')
			.send(registerData)
			.expect(201);

		expect(response.body).toHaveProperty('access_token');
		expect(response.body).toHaveProperty('refresh_token');
		expect(typeof response.body.access_token).toBe('string');
		expect(typeof response.body.refresh_token).toBe('string');
		expect(response.body.access_token.length).toBeGreaterThan(0);
		expect(response.body.refresh_token.length).toBeGreaterThan(0);

		expect(mockEmailsService.sendVerifyAccountEmail).toHaveBeenCalledWith('test@example.com');
		expect(mockEmailsService.sendVerifyAccountEmail).toHaveBeenCalledTimes(1);
	});

	afterAll(async () => {
		jest.clearAllMocks();
		await app.close();
		await orm.close();
	});
});
