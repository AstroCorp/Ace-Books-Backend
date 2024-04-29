import * as fs from 'node:fs';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/orm/entities/User';
import { SignType } from '@/auth/types/signPayload';

@Injectable()
export class MailsService {
	constructor(
		private readonly mailerService: MailerService,
		private readonly jwtService: JwtService,
	) {
		//
	}

	async sendVerifyEmail(user: User) {
		const payload = {
			user_id: user.id,
			type: SignType.VerifyEmail,
		};

		const token = await this.jwtService.signAsync(payload, {
			secret: process.env.URL_SIGNED_SECRET,
			expiresIn: process.env.URL_SIGNED_EXPIRES,
		});

		return this.mailerService.sendMail({
			to: user.email,
			from: process.env.MAIL_USERNAME,
			subject: 'Ace Books - Verify Email',
			template: 'verify',
			context: {
				title: 'Ace Books - Verify Email',
				url: process.env.FRONTEND_URL + '/verify?token=' + token,
			},
			attachments: [
				{
					filename: 'logo.png',
					content: fs.createReadStream(process.cwd() + '/src/mails/icons/ace_logo.png'),
					cid: 'logo',
				},
			],
		});
	}

	async sendResetEmail(user: User) {
		const payload = {
			user_id: user.id,
			type: SignType.ResetPassword,
		};

		const token = await this.jwtService.signAsync(payload, {
			secret: process.env.URL_SIGNED_SECRET,
			expiresIn: process.env.URL_SIGNED_EXPIRES,
		});

		return this.mailerService.sendMail({
			to: user.email,
			from: process.env.MAIL_USERNAME,
			subject: 'Ace Books - Reset Password',
			template: 'reset',
			context: {
				title: 'Ace Books - Reset Password',
				url: process.env.FRONTEND_URL + '/reset?token=' + token,
			},
			attachments: [
				{
					filename: 'logo.png',
					content: fs.createReadStream(process.cwd() + '/src/mails/icons/ace_logo.png'),
					cid: 'logo',
				},
			],
		});
	}
}
