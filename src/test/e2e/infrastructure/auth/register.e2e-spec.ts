import * as request from "supertest";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { MikroORM } from "@mikro-orm/core";
import { HttpStatus } from "@nestjs/common";
import { executeMigrations } from "@/test/e2e/helpers/executeMigrations";
import { setupApp } from "@/test/e2e/helpers/setupApp";
import { SendVerificationEmailUseCase } from "@/application/emails/useCases/sendVerificationEmailUseCase";
import { User } from "@/domain/common/models/User";
import EmailSendFailedException from "@/domain/emails/exceptions/emailSendFailed.exception";

describe('Auth - RegisterController (e2e)', () => {
	let orm: MikroORM;
	let app: NestFastifyApplication;

	beforeAll(async () => {
		orm = await executeMigrations();
		app = await setupApp();
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('/auth/register (POST) - Successfully registered', async () => {
		const registerData = {
			email: 'test@example.com',
			password: 'Test123!@#',
		};

		const response = await request(app.getHttpServer())
			.post('/auth/register')
			.send(registerData)
			.expect(HttpStatus.CREATED);

		expect(response.body).toHaveProperty('access_token');
		expect(response.body).toHaveProperty('refresh_token');
		expect(typeof response.body.access_token).toBe('string');
		expect(typeof response.body.refresh_token).toBe('string');
		expect(response.body.access_token.length).toBeGreaterThan(0);
		expect(response.body.refresh_token.length).toBeGreaterThan(0);
	});

	it('/auth/register (POST) - Email already exists', async () => {
		const registerData = {
			email: 'test@example.com',
			password: 'Test123!@#',
		};

		const response = await request(app.getHttpServer())
			.post('/auth/register')
			.send(registerData)
			.expect(HttpStatus.BAD_REQUEST);

		expect(response.body).toHaveProperty('message');
		expect(response.body.message).toContain('email not available');
	});

	it('/auth/register (POST) - Invalid email', async () => {
		const registerData = {
			email: 'invalid_email',
			password: 'Test123!@#',
		};

		const response = await request(app.getHttpServer())
			.post('/auth/register')
			.send(registerData)
			.expect(HttpStatus.BAD_REQUEST);

		expect(response.body).toHaveProperty('message');
		expect(response.body.message).toContain('invalid email');
	});

	it('/auth/register (POST) - Password is not strong enough', async () => {
		const registerData = {
			email: 'test@example.com',
			password: '1234567890',
		};

		const response = await request(app.getHttpServer())
			.post('/auth/register')
			.send(registerData)
			.expect(HttpStatus.BAD_REQUEST);

		expect(response.body).toHaveProperty('message');
		expect(response.body.message).toContain('password is not strong enough');
	});

	it('/auth/register (POST) - Password is too long', async () => {
		const registerData = {
			email: 'test@example.com',
			password: '1234567890123456789012345678901234567890',
		};

		const response = await request(app.getHttpServer())
			.post('/auth/register')
			.send(registerData)
			.expect(HttpStatus.BAD_REQUEST);

		expect(response.body).toHaveProperty('message');
		expect(response.body.message).toContain('password must be shorter than or equal to 32 characters');
	});

	it('/auth/register (POST) - Email send failed', async () => {
		const registerData = {
			email: 'send_failed@example.com',
			password: 'Test123!@#',
		};

		const executeMock = jest
			.spyOn(SendVerificationEmailUseCase.prototype, 'execute')
			.mockImplementation((user: User) => {
				if (user.email === registerData.email) {
					throw new EmailSendFailedException(user.id, 'Mock error');
				}

				return Promise.resolve();
			});

		const response = await request(app.getHttpServer())
			.post('/auth/register')
			.send(registerData)
			.expect(HttpStatus.CREATED);

		expect(response.body).toHaveProperty('access_token');
		expect(response.body).toHaveProperty('refresh_token');
		expect(typeof response.body.access_token).toBe('string');
		expect(typeof response.body.refresh_token).toBe('string');
		expect(response.body.access_token.length).toBeGreaterThan(0);
		expect(response.body.refresh_token.length).toBeGreaterThan(0);

		expect(executeMock).toHaveBeenCalledWith(
			expect.objectContaining({
				email: registerData.email,
			}),
			expect.any(URL),
		);
		expect(executeMock).toHaveBeenCalledTimes(1);

		executeMock.mockRestore();
	});

	afterAll(async () => {
		jest.clearAllMocks();
		if (orm) await orm.close();
		if (app) await app.close();
	});
});
