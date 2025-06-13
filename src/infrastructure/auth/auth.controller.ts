import { Body, Controller, Get, Headers, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { LocalAuthGuard } from '@/infrastructure/auth/guards/local.guard';
import { Session } from '@/infrastructure/auth/types/session';
import { AuthService } from '@/application/auth/auth.service';
import { JwtRefreshAuthGuard } from '@/infrastructure/auth/guards/jwt-refresh.guard';
import { CreateUserDTO } from '@/infrastructure/auth/validation/dto/createUser.dto';
import { EmailsService } from '@/infrastructure/emails/emails.service';
import { SendResetPasswordDTO } from '@/infrastructure/auth/validation/dto/sendResetPassword.dto';
import { JwtAuthGuard } from '@/infrastructure/auth/guards/jwt.guard';
import { SignGuard } from '@/infrastructure/auth/guards/sign.guard';
import { ResetPasswordDTO } from '@/infrastructure/users/validation/dto/resetPassword.dto';

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private emailsService: EmailsService,
	) {
		//
	}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	login(@Request() req: Session) {
		return this.authService.login(req.user);
	}

	@Post('register')
	register(@Body() body: CreateUserDTO) {
		return this.authService.register(body);
	}

	@UseGuards(JwtRefreshAuthGuard)
	@Get('refresh')
	refresh(@Request() req: Session, @Headers('authorization') authHeader: string) {
		return this.authService.refresh(req.user, authHeader);
	}

	@Throttle({
		default: {
			ttl: process.env.EMAILS_RATE_LIMIT_TTL,
			limit: process.env.EMAILS_RATE_LIMIT_MAX,
		},
	})
	@UseGuards(JwtAuthGuard)
	@Post('send-verify-account-email')
	@HttpCode(200)
	sendVerifyAccountEmail(@Request() req: Session) {
		return this.emailsService.sendVerifyAccountEmail(req.user.email);
	}

	@Throttle({
		default: {
			ttl: process.env.EMAILS_RATE_LIMIT_TTL,
			limit: process.env.EMAILS_RATE_LIMIT_MAX,
		},
	})
	@Post('send-reset-password-email')
	@HttpCode(200)
	sendResetPasswordEmail(@Body() body: SendResetPasswordDTO) {
		return this.emailsService.sendResetPasswordEmail(body.email);
	}

	@UseGuards(JwtAuthGuard, SignGuard)
	@Get('verify-email')
	@HttpCode(200)
	verifyEmail(@Request() req: Session) {
		return this.authService.verifyEmail(req.user);
	}

	@Post('reset-password')
	@HttpCode(200)
	resetPassword(@Body() body: ResetPasswordDTO) {
		return this.authService.resetPassword(body.token, body.email, body.password);
	}
}
