import { Controller, Get, Post, Body, UseGuards, Request, HttpCode } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { Session } from '@/auth/types/session';
import { UsersService } from '@/users/users.service';
import { ResendResetPasswordDTO } from '@/users/validation/dto/resendResetPassword.dto';
import { VerifyEmailDTO } from '@/users/validation/dto/verifyEmail.dto';
import { ResetPasswordDTO } from '@/users/validation/dto/resetPassword.dto';

@Controller('users')
export class UsersController
{
	constructor(
		private userService: UsersService,
	) {
		//
	}

	@UseGuards(JwtAuthGuard)
  	@Get('profile')
  	getProfile(@Request() req: Session) {
    	return req.user.getData();
	}

	@UseGuards(JwtAuthGuard)
	@Post('verify-email-resend')
	@HttpCode(200)
	resendVerificationEmail(@Request() req: Session) {
		return this.userService.resendVerificationEmail(req.user);
	}

	@Post('reset-password-resend')
	@HttpCode(200)
	resendResetEmail(@Body() body: ResendResetPasswordDTO) {
		return this.userService.resendResetPasswordEmail(body.email);
	}

	@UseGuards(JwtAuthGuard)
	@Post('verify-email')
	@HttpCode(200)
	verifyEmail(@Request() req: Session, @Body() body: VerifyEmailDTO) {
		return this.userService.verifyEmail(req.user, body.token);
	}

	@Post('reset-password')
	@HttpCode(200)
	resetPassword(@Body() body: ResetPasswordDTO) {
		return this.userService.resetPassword(body.token, body.password);
	}
}
