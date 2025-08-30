import { Controller, HttpCode, HttpStatus, Post, Request, UseFilters, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { JwtAuthGuard } from '@/infrastructure/auth/guards/jwt.guard';
import { SendVerificationEmailUseCase } from '@/application/emails/useCases/sendVerificationEmailUseCase';
import { Session } from '@/infrastructure/auth/types/session';
import UserAlreadyVerifiedException from '@/domain/emails/exceptions/userAlreadyVerified.exception';
import EmailSendFailedException from '@/domain/emails/exceptions/emailSendFailed.exception';
import { ExceptionFilter } from '@/infrastructure/common/filters/exception.filter';
import { GenerateVerificationAccountUrlUseCase } from '@/application/users/useCases/generateVerificationAccountUrlUseCase';

@Throttle({
	default: {
		ttl: process.env.EMAILS_RATE_LIMIT_TTL,
		limit: process.env.EMAILS_RATE_LIMIT_MAX,
	},
})
@Controller('users')
export class SendVerifyAccountEmailController {
	constructor(
		private readonly generateVerificationAccountUrlUseCase: GenerateVerificationAccountUrlUseCase,
		private readonly sendVerificationEmailUseCase: SendVerificationEmailUseCase,
	) {
		//
	}

	@UseGuards(JwtAuthGuard)
	@Post('send-verify-account-email')
	@HttpCode(HttpStatus.OK)
	@UseFilters(new ExceptionFilter([
		{
			exception: UserAlreadyVerifiedException,
			status: HttpStatus.BAD_REQUEST,
		},
		{
			exception: EmailSendFailedException,
			status: HttpStatus.INTERNAL_SERVER_ERROR,
		},
	]))
	async __invoke(@Request() req: Session) {
		const verifyAccountUrl = this.generateVerificationAccountUrlUseCase.execute(req.user);

		await this.sendVerificationEmailUseCase.execute(req.user, verifyAccountUrl);
	}
}
