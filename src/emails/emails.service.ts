import * as fs from 'node:fs';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/orm/entities/User';
import { SignType } from '@/auth/types/signPayload';
import { UsersService } from '@/users/users.service';

@Injectable()
export class EmailsService {
	constructor(
		private readonly mailerService: MailerService,
		private readonly jwtService: JwtService,
		private readonly userService: UsersService,
	) {
		//
	}

	async sendVerifyAccountEmail(user: User) {
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
					content: fs.createReadStream(__dirname + '/icons/ace_logo.png'),
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
					content: fs.createReadStream(__dirname + '/icons/ace_logo.png'),
					cid: 'logo',
				},
			],
		});
	}

	async resendVerifyAccountEmail(user: User) {
		if (user.isVerified) {
			return;
		}

		await this.sendVerifyAccountEmail(user);
	}

	async resendResetPasswordEmail(email: string) {
		const user = await this.userService.findOneByEmail(email);

		if (!user) {
			return;
		}

		console.log('__dirname', __dirname)

		await this.sendResetEmail(user);
	}
}
