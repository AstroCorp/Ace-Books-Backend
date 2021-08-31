import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AuthModule } from './auth.module';
import { OrmModule } from '../orm/orm.module';
import { AppModule } from '../app.module';
import { MailsService } from '../mails/mails.service';

describe('Auth', () => {
	let app: INestApplication;
	const mailsService = { sendVerifyEmail: () => {} };
	let token: string;
	let cookies: string[];

	beforeAll(async () => {
		const module = await Test.createTestingModule({
			imports: [
				AppModule,
				AuthModule,
				OrmModule,
			],
		})
		.overrideProvider(MailsService)
		.useValue(mailsService)
		.compile();

		app = module.createNestApplication();

		useContainer(app.select(AppModule), {
			fallbackOnErrors: true,
		});

		app.use(cookieParser());

		app.useGlobalPipes(new ValidationPipe());

		await app.init();
	});

	it('@POST /auth/register', () => {
		return request(app.getHttpServer())
			.post('/auth/register')
			.send('email=test@test.es')
			.send('password=123456')
			.expect(201);
	});

	it('@POST /auth/login', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send('email=test@test.es')
			.send('password=123456')
			.expect(200)
			.then((response: request.Response) => {
				token = response.body.access_token;
				cookies = response.header['set-cookie'];
			});
	});

	it('@POST /auth/refresh', () => {
		return request(app.getHttpServer())
			.post('/auth/refresh')
			.set('Authorization', 'Bearer ' + token)
			.set('Cookie', cookies)
			.then((response) => {
				token = response.body.access_token;
			});
	});

	afterAll(async () => {
		await app.close();
	});
});
