import { Inject, Injectable } from '@nestjs/common';
import { EMAILS_PORT, EmailsPort } from '@/domain/emails/ports/emails.port';
import { User } from '@/domain/common/models/User';
import EmailSendFailedException from '@/domain/emails/exceptions/emailSendFailed.exception';

@Injectable()
export class SendResetPasswordEmailUseCase {
	constructor(
		@Inject(EMAILS_PORT)
		private readonly emailsService: EmailsPort,
	) {
		//
	}

	public async execute(user: User, url: URL): Promise<void>
	{
		try {
			await this.emailsService.sendMail({
				to: user.email,
				from: process.env.MAIL_USERNAME,
				subject: 'Ace Books - Reset Password',
				template: 'reset',
				context: {
					title: 'Ace Books - Reset Password',
					url: url.toString(),
				},
				attachments: [
					{
						filename: 'logo.png',
						content: '/icons/ace_logo.png',
						cid: 'logo',
					},
				],
			});
		} catch (error) {
			throw new EmailSendFailedException(user.id, error.message);
		}
	}
}
