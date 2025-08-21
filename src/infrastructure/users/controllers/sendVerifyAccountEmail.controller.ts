import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { JwtAuthGuard } from '@/infrastructure/auth/guards/jwt.guard';
import { SendVerificationEmailUseCase } from '@/application/emails/useCases/sendVerificationEmailUseCase';
import { Session } from '@/infrastructure/auth/types/session';

@Throttle({
	default: {
		ttl: process.env.EMAILS_RATE_LIMIT_TTL,
		limit: process.env.EMAILS_RATE_LIMIT_MAX,
	},
})
@Controller('users')
export class SendVerifyAccountEmailController {
	constructor(
		private readonly sendVerificationEmailUseCase: SendVerificationEmailUseCase,
	) {
		//
	}

	@UseGuards(JwtAuthGuard)
	@Post('send-verify-account-email')
	@HttpCode(200)
	async __invoke(@Request() req: Session) {
		await this.sendVerificationEmailUseCase.execute(req.user);
	}
}
