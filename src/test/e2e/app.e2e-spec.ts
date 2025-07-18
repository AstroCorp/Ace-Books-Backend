import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

describe('AppController (e2e)', () => {
	let app: NestFastifyApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication<NestFastifyApplication>(
			new FastifyAdapter(),
		);

		await app.init();
		await app.getHttpAdapter().getInstance().ready();
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
