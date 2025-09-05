import * as request from 'supertest';
import { HttpStatus } from "@nestjs/common";
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { EmailsService } from '@/infrastructure/emails/services/emails.service';

export const getResetPasswordUrl = async (app: NestFastifyApplication, email: string): Promise<URL> => {
	let url: URL;

	const executeMock = jest.spyOn(EmailsService.prototype, 'sendMail').mockImplementation((options) => {
		url = new URL(options.context.url);
		return Promise.resolve();
	});

	await request(app.getHttpServer())
		.post('/auth/send-reset-password-email')
		.send({ email })
		.expect(HttpStatus.OK);

	executeMock.mockRestore();

	return url;
}
