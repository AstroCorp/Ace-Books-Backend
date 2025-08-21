import { Inject, Injectable } from '@nestjs/common';
import { EMAILS_PORT, EmailsPort } from '@/domain/emails/ports/emails.port';
import { User } from '@/domain/models/User';
import { TokenType } from '@/domain/models/Token';
import { JWT_PORT, JwtPort } from '@/domain/auth/ports/jwt.port';
import { TOKEN_WRITER_REPOSITORY, TokenWriterRepositoryInterface } from '@/domain/auth/repositories/tokenWriterRepositoryInterface';

@Injectable()
export class SendResetPasswordEmailUseCase {
	constructor(
		@Inject(EMAILS_PORT)
		private readonly emailsService: EmailsPort,

		@Inject(JWT_PORT)
		private readonly jwtService: JwtPort,

		@Inject(TOKEN_WRITER_REPOSITORY)
		private readonly tokenRepository: TokenWriterRepositoryInterface,
	) {
		//
	}

	public async execute(user: User): Promise<void>
	{
		const tokenString = this.jwtService.sign({}, {
			secret: process.env.GENERIC_JWT_SECRET,
			expiresIn: process.env.GENERIC_JWT_SECRET_EXPIRES,
		});

		await this.tokenRepository.create(tokenString, user.id, TokenType.RESET);

		const frontUrl = new URL(process.env.FRONTEND_URL + '/reset-password');
		frontUrl.searchParams.append('token', tokenString);
		frontUrl.searchParams.append('email', user.email);

		return this.emailsService.sendMail({
			to: user.email,
			from: process.env.MAIL_USERNAME,
			subject: 'Ace Books - Reset Password',
			template: 'reset',
			context: {
				title: 'Ace Books - Reset Password',
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
	}
}
