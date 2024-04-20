import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '@/auth/guards/local.guard';
import { Session } from '@/auth/types/session';
import { AuthService } from '@/auth/auth.service';

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
	) {
		//
	}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	login(@Request() req: Session) {
		return this.authService.login(req.user);
	}
}
