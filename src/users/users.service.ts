import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from '@/orm/entities/User';
import { Token } from '@/orm/entities/Token';
import { TokenType } from '@/orm/types/entities';

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

	async verifyEmail(userId: number, user: User, token: string) {
		if (user.id !== userId) {
			throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
		}

		if (user.isVerified) {
			return;
		}

		const tokenEntity = await this.tokenRepository.findOne({
			token,
			user: user.id,
		});

		if (!tokenEntity || tokenEntity.type !== TokenType.VERIFY || !tokenEntity.isValid()) {
			throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
		}

		tokenEntity.revoke();

		user.isVerified = true;

		await this.em.flush();
	}

	async resetPassword(userId: number, token: string, password: string) {
		const user = await this.findOneById(userId);

		if (!user) {
			throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
		}

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
