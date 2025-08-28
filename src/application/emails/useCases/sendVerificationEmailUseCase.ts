import { DateTime } from 'luxon';
import { Inject, Injectable } from '@nestjs/common';
import { EMAILS_PORT, EmailsPort } from '@/domain/emails/ports/emails.port';
import { HASH_PORT, HashPort } from '@/domain/auth/ports/hash.port';
import { SIGN_PORT, SignPort } from '@/domain/auth/ports/sign.ports';
import { User } from '@/domain/common/models/User';
import UserAlreadyVerifiedException from '@/domain/emails/exceptions/userAlreadyVerified.exception';
import EmailSendFailedException from '@/domain/emails/exceptions/emailSendFailed.exception';

@Injectable()
export class SendVerificationEmailUseCase {
	constructor(
		@Inject(HASH_PORT)
		private readonly hashService: HashPort,

		@Inject(SIGN_PORT)
		private readonly signService: SignPort,

		@Inject(EMAILS_PORT)
		private readonly emailsService: EmailsPort,
	) {
		//
	}

	public async execute(user: User): Promise<void>
	{
		if (user.isVerified) {
			throw new UserAlreadyVerifiedException(user.id);
		}

		const userId = user.id.toString();
		const hash = this.hashService.generate(user.email);

		const verifyUrl = new URL(process.env.BACKEND_URL + '/users/verify-email');
		const body = JSON.stringify({
			userId,
			hash
		});

		verifyUrl.searchParams.set('body', body);

		const expiration = DateTime.now().plus({ minutes: parseInt(process.env.GENERIC_JWT_SECRET_EXPIRES) }).toJSDate();
		const urlSigned = this.signService.generate(verifyUrl, expiration);

		// Añadimos los parámetros de la URL firmada a la URL del frontend para que
		// sean usados al hacer la petición de verificación de email
		const frontUrl = new URL(process.env.FRONTEND_URL + '/verify-email');

		Array.from(urlSigned.searchParams.entries()).forEach(([key, value]) => {
			frontUrl.searchParams.append(key, value);
		});

		try {
			await this.emailsService.sendMail({
				to: user.email,
				from: process.env.MAIL_USERNAME,
				subject: 'Ace Books - Verify Email',
				template: 'verify',
				context: {
					title: 'Ace Books - Verify Email',
					url: frontUrl.toString(),
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
