import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { OrmModule } from '../orm/orm.module';
import { AppModule } from '../app.module';
import { MailsService } from '../mails/mails.service';
import { useContainer } from 'class-validator';

describe('Auth', () => {
	let app: INestApplication;
	let mailsService = { sendVerifyEmail: () => {} };

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
			fallbackOnErrors: true 
		});
	
		app.useGlobalPipes(new ValidationPipe());

		await app.init();
	});

	it(`@POST /auth/register`, () => {
		return request(app.getHttpServer())
			.post('/auth/register')
			.send('email=test@test.es')
			.send('password=123456')
			.send('lang=es')
			.expect(201);
	});

	it(`@POST /auth/login`, () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send('email=test@test.es')
			.send('password=123456')
			.expect(201);
	});

	afterAll(async () => {
		await app.close();
	});
});
