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
	@Post('verify-email')
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
	@Post('reset-password')
	@HttpCode(200)
	sendResetPasswordEmail(@Body() body: SendResetPasswordDTO) {
		return this.emailsService.sendResetPasswordEmail(body.email);
	}
}
