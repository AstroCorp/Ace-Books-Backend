import { Inject, Injectable } from "@nestjs/common";
import { EMAILS_PORT, EmailsPort } from "@/domain/emails/ports/emails.port";
import { User } from "@/domain/common/models/User";
import UserAlreadyVerifiedException from "@/domain/emails/exceptions/userAlreadyVerified.exception";
import EmailSendFailedException from "@/domain/emails/exceptions/emailSendFailed.exception";

@Injectable()
export class SendVerificationEmailUseCase {
	constructor(
		@Inject(EMAILS_PORT)
		private readonly emailsService: EmailsPort,
	) {
		//
	}

	public async execute(user: User, url: URL): Promise<void>
	{
		if (user.isVerified) {
			throw new UserAlreadyVerifiedException(user.id);
		}

		try {
			await this.emailsService.sendMail({
				to: user.email,
				from: process.env.MAIL_USERNAME,
				subject: 'Ace Books - Verify Email',
				template: 'verify',
				context: {
					title: 'Ace Books - Verify Email',
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
