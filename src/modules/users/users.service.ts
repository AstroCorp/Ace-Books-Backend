import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { MailerService } from '@nestjs-modules/mailer';
import { v4 as uuidv4 } from 'uuid';
import { RefreshToken, User } from '../../orm/entities';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: EntityRepository<User>,

		@InjectRepository(RefreshToken)
		private readonly refreshTokenRepository: EntityRepository<RefreshToken>,

		private readonly jwtService: JwtService,

		private readonly mailerService: MailerService,
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

	async createToken(user: User) {
		const access_payload = { sub: user.email };
		const refresh_token = uuidv4();

		const newRefreshToken = new RefreshToken(user, refresh_token);
		await this.refreshTokenRepository.persistAndFlush(newRefreshToken);

		return {
			access_token: this.jwtService.sign(access_payload),
			refresh_token,
		};
	}

	sendEmail()
	{
		return this.mailerService.sendMail({
			to: '',
			from: '',
			subject: 'Testing Nest Mailer module with template ✔',
			template: 'index',
			context: {},
		});
	}
}
