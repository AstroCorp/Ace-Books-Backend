import { Controller, UseGuards, Get, Request, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { VerifyEmailDto } from './validation/verifyEmailDto';
import { ResetPasswordDto } from './validation/resetPasswordDto';
import { ResendResetPasswordDto } from './validation/resendResetPasswordDto';

@ApiTags('users')
@Controller('users')
export class UsersController 
{
	constructor(
		private userService: UsersService,
	) {
		//
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Post('verify')
	@HttpCode(200)
	verifyEmail(@Request() req, @Body() body: VerifyEmailDto) {
		return this.userService.verifyEmail(req.user, body.code);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Post('verify-resend')
	@HttpCode(200)
	resendVerificationMail(@Request() req) {
		return this.userService.resendVerificationMail(req.user);
	}

	@ApiBearerAuth()
	@Post('reset')
	@HttpCode(200)
	resetPassword(@Body() body: ResetPasswordDto) {
		return this.userService.resetPassword(body.email, body.code, body.newPassword);
	}

	@ApiBearerAuth()
	@Post('reset-resend')
	@HttpCode(200)
	resendResetMail(@Body() body: ResendResetPasswordDto) {
		return this.userService.resendResetMail(body.email);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		return req.user.email;
	}
}