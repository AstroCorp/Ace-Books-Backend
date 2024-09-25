import { Controller, Get, Post, Body, UseGuards, Request, HttpCode } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { Session } from '@/auth/types/session';
import { UsersService } from '@/users/users.service';
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
    	return req.user.getDataForProfile();
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
