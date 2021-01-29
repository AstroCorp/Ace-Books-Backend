import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../orm/entities';

@Injectable()
export class UsersService
{
	constructor(
		@InjectRepository(User)
		private readonly userRepository: EntityRepository<User>,
	) {
		//
	}

	async findOne(email: string) {
		return await this.userRepository.findOne({
			email,
		});
	}

	async create(user: User) {
		return await this.userRepository.persistAndFlush(user);
	}
}
