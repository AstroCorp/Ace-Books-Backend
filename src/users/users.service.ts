import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from '@/orm/entities/User';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: EntityRepository<User>,
		private readonly em: EntityManager,
	) {
		//
	}

	findOneByEmail(email: string) {
		return this.userRepository.findOne({
			email,
		});
	}

	findOneById(id: number) {
		return this.userRepository.findOne({
			id,
		});
	}

	async create(user: User) {
		const userEntity = this.userRepository.create(user);

		await this.em.flush();

		return userEntity;
	}
}
