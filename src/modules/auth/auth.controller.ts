import { Controller, UseGuards, Get, Post, Request, Body } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../orm/entities';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from './validation/createUserDto';
import { RefreshTokenDto } from './validation/refreshTokenDto';

@Controller('auth')
export class AuthController {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: EntityRepository<User>,

		private authService: AuthService,
	) {
		//
	}

	@Post('register')
	async register(@Body() body: CreateUserDto) {
		return await this.authService.register(body.email, body.password, body.lang);
	}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		return req.user.email;
	}

	@Post('refresh')
	refreshToken(@Body() body: RefreshTokenDto) {
		return this.authService.refreshToken(body.email, body.refreshToken);
	}

	@Get('test')
	async test() {
		const u = await this.userRepository.findOne(1);
		return (await (u as User).books.init()).getItems();
	}
}
