import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '@/infrastructure/auth/guards/jwt.guard';
import { Session } from '@/infrastructure/auth/types/session';

@Controller('users')
export class UsersController
{
	constructor() {
		//
	}

	@UseGuards(JwtAuthGuard)
  	@Get('profile')
  	getProfile(@Request() req: Session) {
    	return "User profile";
	}
}
