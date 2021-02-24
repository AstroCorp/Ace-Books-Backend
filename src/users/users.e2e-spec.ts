import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { UsersModule } from './users.module';
import { OrmModule } from '../orm/orm.module';
import { AppModule } from '../app.module';
import { MailsService } from '../mails/mails.service';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { User } from '../orm/entities';
import Tokens from '../auth/types/tokens';

describe('Users', () => {
	let app: INestApplication;
	let tokens: Tokens;
	let user: User | null;

	beforeAll(async () => {
		const mailsService = { sendVerifyEmail: () => {} };
		const module = await Test.createTestingModule({
			imports: [
                AppModule,
				UsersModule,
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
	
		app.useGlobalPipes(new ValidationPipe());

		const authService: AuthService = module.get<AuthService>(AuthService);
		const usersService: UsersService = module.get<UsersService>(UsersService);

		await app.init();

		user = await usersService.findOne('test@test.test');
		tokens = await authService.createToken(user as User);
	});

	it('@POST /users/verify', () => {
		return request(app.getHttpServer())
			.post('/users/verify')
			.set('Authorization', 'Bearer ' + tokens.access_token)
			.send('code=' + (user as User).codes?.email_code)
			.expect(200);
	});

	it('@POST /users/reset', () => {
		return request(app.getHttpServer())
			.post('/users/reset')
			.send('email=' + (user as User).email)
			.send('code=' + (user as User).codes?.password_code)
			.send('newPassword=123456abc')
			.expect(200);
	});

	afterAll(async () => {
		await app.close();
	});
});
