import { Controller, UseGuards, Get, Request, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../orm/entities';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { VerifyEmailDto } from './validation/verifyEmailDto';
import { v4 as uuidv4 } from 'uuid';
@ApiTags('users')
@Controller('users')
export class UsersController 
{
	constructor(
		@InjectRepository(User)
		private readonly userRepository: EntityRepository<User>,

		private userService: UsersService,
	) {
		//
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Post('verify')
	verifyEmail(@Request() req, @Body() body: VerifyEmailDto) {
		return this.userService.verifyEmail(req.user, body.code);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get('verify-resend')
	resendVerificationMail(@Request() req) {
		return this.userService.resendVerificationMail(req.user);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		return req.user.email;
	}

	@Get('test')
	async test() {
		const u = await this.userRepository.findOne(1);
		return (await (u as User).books.init()).getItems();
	}
}
