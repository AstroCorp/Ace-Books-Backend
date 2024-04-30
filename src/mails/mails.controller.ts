import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { Session } from '@/auth/types/session';
import { MailsService } from '@/mails/mails.service';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { ResendResetPasswordDTO } from '@/mails/validation/dto/resendResetPassword.dto';

@Controller('mails')
export class MailsController {
	constructor(
		private mailsService: MailsService,
	) {
		//
	}

	@UseGuards(JwtAuthGuard)
	@Post('verify-email')
	@HttpCode(200)
	resendVerifyAccountEmail(@Request() req: Session) {
		return this.mailsService.resendVerifyAccountEmail(req.user);
	}

	@Post('reset-password')
	@HttpCode(200)
	resendResetPasswordEmail(@Body() body: ResendResetPasswordDTO) {
		return this.mailsService.resendResetPasswordEmail(body.email);
	}
}
