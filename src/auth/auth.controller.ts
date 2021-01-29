import { Controller, UseGuards, Get, Post, Request, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from './validation/createUserDto';
import { RefreshTokenDto } from './validation/refreshTokenDto';
import { loginDto } from './validation/loginDto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
	) {
		//
	}

	@Post('register')
	async register(@Body() body: CreateUserDto) {
		return await this.authService.register(body.email, body.password, body.lang);
	}

	@ApiBody({ type: loginDto })
	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@Post('refresh')
	refreshToken(@Body() body: RefreshTokenDto) {
		return this.authService.refreshToken(body.email, body.refreshToken);
	}
}
