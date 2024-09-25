import * as fs from 'node:fs';
import { DateTime } from 'luxon';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '@/orm/entities/User';
import { UsersService } from '@/users/users.service';
import { generateUrlSigned } from '@/utils/sign';

@Injectable()
export class EmailsService {
	constructor(
		private readonly mailerService: MailerService,
		private readonly userService: UsersService,
	) {
		//
	}

	async sendVerifyAccountEmail(user: User) {
		const verifyUrl = new URL(process.env.FRONTEND_URL + '/verify');
		verifyUrl.searchParams.append('userId', user.id.toString());

		const expiration = DateTime.now().plus({ days: 2 }).toJSDate();
		const urlSigned = generateUrlSigned(verifyUrl.toString(), expiration);

		return this.mailerService.sendMail({
			to: user.email,
			from: process.env.MAIL_USERNAME,
			subject: 'Ace Books - Verify Email',
			template: 'verify',
			context: {
				title: 'Ace Books - Verify Email',
				url: urlSigned,
			},
			attachments: [
				{
					filename: 'logo.png',
					content: fs.createReadStream(__dirname + '/icons/ace_logo.png'),
					cid: 'logo',
				},
			],
		});
	}

	async sendResetEmail(user: User) {
		const verifyUrl = new URL(process.env.FRONTEND_URL + '/reset');
		verifyUrl.searchParams.append('userId', user.id.toString());

		const expiration = DateTime.now().plus({ minutes: 15 }).toJSDate();
		const urlSigned = generateUrlSigned(verifyUrl.toString(), expiration);

		return this.mailerService.sendMail({
			to: user.email,
			from: process.env.MAIL_USERNAME,
			subject: 'Ace Books - Reset Password',
			template: 'reset',
			context: {
				title: 'Ace Books - Reset Password',
				url: urlSigned,
			},
			attachments: [
				{
					filename: 'logo.png',
					content: fs.createReadStream(__dirname + '/icons/ace_logo.png'),
					cid: 'logo',
				},
			],
		});
	}

	async resendVerifyAccountEmail(user: User) {
		if (user.isVerified) return;

		await this.sendVerifyAccountEmail(user);
	}

	async resendResetPasswordEmail(email: string) {
		const user = await this.userService.findOneByEmail(email);

		if (!user) return;

		await this.sendResetEmail(user);
	}
}
