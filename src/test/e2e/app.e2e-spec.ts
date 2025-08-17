import * as request from 'supertest';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { setupApp } from '@/test/e2e/helpers/setupApp';

describe('AppController (e2e)', () => {
	let app: NestFastifyApplication;

	beforeAll(async () => {
		app = await setupApp([]);
	});

	it('/ (GET)', () => {
		return request(app.getHttpServer())
			.get('/')
			.expect(200)
			.expect('Welcome to Ace Books API!');
	});

	afterAll(async () => {
		await app.close();
	});
});
