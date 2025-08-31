import * as request from 'supertest';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { HttpStatus } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { executeMigrations } from '@/test/e2e/helpers/executeMigrations';
import { setupApp } from '@/test/e2e/helpers/setupApp';

describe('Auth - ResetPasswordController (e2e)', () => {
	let orm: MikroORM;
	let app: NestFastifyApplication;

	beforeAll(async () => {
		orm = await executeMigrations();
		app = await setupApp();
	});

	it.todo('/auth/reset-password (POST) - Successfully reset password');

	it.todo('/auth/reset-password (POST) - Fail to reset password, invalid token');

	it.todo('/auth/reset-password (POST) - Fail to reset password, invalid password');

	it.todo('/auth/reset-password (POST) - Fail to reset password, invalid email');

	it.todo('/auth/reset-password (POST) - Fail to reset password, revoked token');

	it.todo('/auth/reset-password (POST) - Fail to reset password, expired token');

	afterAll(async () => {
		if (orm) await orm.close();
		if (app) await app.close();
	});
});
