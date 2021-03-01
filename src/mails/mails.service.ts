import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { User } from '../orm/entities';

@Injectable()
export class MailsService 
{
    constructor(
        private readonly mailerService: MailerService,

		private readonly configService: ConfigService,
    ) {
        //
    }

    async sendVerifyEmail(user: User): Promise<void> {
		await this.mailerService.sendMail({
			to: user.email,
			from: this.configService.get<string>('MAIL_USERNAME'),
			subject: 'Ace Books - Verify Email',
			template: 'verify',
			context: {
				title: 'Ace Books - Verify Email',
				code: user.codes?.email_code,
			},
		});
	}

	async sendResetEmail(user: User): Promise<void> {
		await this.mailerService.sendMail({
			to: user.email,
			from: this.configService.get<string>('MAIL_USERNAME'),
			subject: 'Ace Books - Reset Password',
			template: 'reset',
			context: {
				title: 'Ace Books - Reset Password',
				code: user.codes?.password_code,
			},
		});
	}
}
