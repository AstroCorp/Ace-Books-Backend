import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from '@/infrastructure/orm/entities/User';
import { Token } from '@/infrastructure/orm/entities/Token';
import { TokenType } from '@/infrastructure/orm/types/entities';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: EntityRepository<User>,
		@InjectRepository(Token)
		private readonly tokenRepository: EntityRepository<Token>,
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

	async verifyEmail(user: User) {
		if (user.isVerified) {
			return;
		}

		user.isVerified = true;

		await this.em.flush();
	}

	async resetPassword(token: string, email: string, password: string) {
		const user = await this.findOneByEmail(email);
		const tokenEntity = await this.tokenRepository.findOne({
			token,
			user: user.id,
		});

		if (!tokenEntity || tokenEntity.type !== TokenType.RESET || !tokenEntity.isValid()) {
			throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
		}

		tokenEntity.revoke();

		user.password = password;

		await this.em.flush();
	}
}
