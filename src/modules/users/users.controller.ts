import { Controller, UseGuards, Get, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../orm/entities';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController 
{
	constructor(
		@InjectRepository(User)
		private readonly userRepository: EntityRepository<User>,
	) {
		//
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
