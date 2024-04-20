import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { Session } from '@/auth/types/session';

@Controller('users')
export class UsersController
{
	constructor() {
		//
	}

	@UseGuards(JwtAuthGuard)
  	@Get('profile')
  	getProfile(@Request() req: Session) {
    	return req.user.getData();
	}
}
