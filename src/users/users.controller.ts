import { Controller, Get, Post, Body, UseGuards, Request, HttpCode } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { SignGuard } from '@/auth/guards/sign.guard';
import { Session } from '@/auth/types/session';
import { UsersService } from '@/users/users.service';
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
    	return req.user.getDataForProfile();
	}

	@UseGuards(JwtAuthGuard, SignGuard)
	@Get('verify-email')
	@HttpCode(200)
	verifyEmail(@Request() req: Session) {
		return this.userService.verifyEmail(req.user);
	}

	@Post('reset-password')
	@HttpCode(200)
	resetPassword(@Body() body: ResetPasswordDTO) {
		return this.userService.resetPassword(body.token, body.email, body.password);
	}
}
