import { Body, Controller, Get, Headers, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '@/auth/guards/local.guard';
import { Session } from '@/auth/types/session';
import { AuthService } from '@/auth/auth.service';
import { JwtRefreshAuthGuard } from '@/auth/guards/jwt-refresh.guard';
import { CreateUserDTO } from '@/auth/validation/dto/createUser.dto';

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

	@Post('register')
	register(@Body() body: CreateUserDTO) {
		return this.authService.register(body);
	}

	@UseGuards(JwtRefreshAuthGuard)
	@Get('refresh')
	refresh(@Request() req: Session, @Headers('authorization') authHeader: string) {
		return this.authService.refresh(req.user, authHeader);
	}
}
