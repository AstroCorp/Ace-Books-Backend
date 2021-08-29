import { Controller, Get, UseGuards, Request, Post, Body, HttpCode } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { VerifyEmailDto } from './validation/dto/verifyEmail.dto';
import { ResetPasswordDto } from './validation/dto/resetPassword.dto';
import { ResendResetPasswordDto } from './validation/dto/resendResetPassword.dto';
import Session from '../auth/types/session';

@Controller('users')
export class UsersController
{
	constructor(
		private userService: UsersService,
	) {
		//
	}

	@UseGuards(JwtAuthGuard)
	@Post('verify')
	@HttpCode(200)
	verifyEmail(@Request() req: Session, @Body() body: VerifyEmailDto): Promise<void> {
		return this.userService.verifyEmail(req.user, body.code);
	}

	@UseGuards(JwtAuthGuard)
	@Post('verify-resend')
	@HttpCode(200)
	resendVerificationMail(@Request() req: Session): Promise<void> {
		return this.userService.resendVerificationMail(req.user);
	}

	@Post('reset')
	@HttpCode(200)
	resetPassword(@Body() body: ResetPasswordDto): Promise<void> {
		return this.userService.resetPassword(body.email, body.code, body.newPassword);
	}

	@Post('reset-resend')
	@HttpCode(200)
	resendResetMail(@Body() body: ResendResetPasswordDto): Promise<void> {
		return this.userService.resendResetMail(body.email);
	}

	@UseGuards(JwtAuthGuard)
  	@Get('profile')
  	getProfile(@Request() req: any): Promise<any> {
    	return req.user;
	}
}
