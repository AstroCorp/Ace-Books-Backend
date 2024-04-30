import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { Session } from '@/auth/types/session';
import { EmailsService } from '@/emails/emails.service';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { ResendResetPasswordDTO } from '@/emails/validation/dto/resendResetPassword.dto';
import { Throttle } from '@nestjs/throttler';

@Throttle({
	default: {
		ttl: process.env.EMAILS_RATE_LIMIT_TTL,
		limit: process.env.EMAILS_RATE_LIMIT_MAX,
	},
})
@Controller('emails')
export class EmailsController {
	constructor(
		private emailsService: EmailsService,
	) {
		//
	}

	@UseGuards(JwtAuthGuard)
	@Post('verify-email')
	@HttpCode(200)
	resendVerifyAccountEmail(@Request() req: Session) {
		return this.emailsService.resendVerifyAccountEmail(req.user);
	}

	@Post('reset-password')
	@HttpCode(200)
	resendResetPasswordEmail(@Body() body: ResendResetPasswordDTO) {
		return this.emailsService.resendResetPasswordEmail(body.email);
	}
}
