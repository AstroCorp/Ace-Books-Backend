import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { MailerService } from '@nestjs-modules/mailer';
import { v4 as uuidv4 } from 'uuid';
import { RefreshToken, User } from '../orm/entities';

@Injectable()
export class UsersService
{
	constructor(
		@InjectRepository(User)
		private readonly userRepository: EntityRepository<User>,

		@InjectRepository(RefreshToken)
		private readonly refreshTokenRepository: EntityRepository<RefreshToken>,

		private readonly jwtService: JwtService,

		private readonly mailerService: MailerService,

		private readonly configService: ConfigService,
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
		const access_token = this.jwtService.sign({ sub: user.email });
		const refresh_token = this.jwtService.sign({ /* refresh token */ });

		const newRefreshToken = new RefreshToken(user, refresh_token);
		await this.refreshTokenRepository.persistAndFlush(newRefreshToken);

		return {
			access_token,
			refresh_token,
		};
	}

	async sendVerifyEmail(user: User)
	{
		wrap(user).assign({
			verificationCode: uuidv4(),
		});
		
		await this.userRepository.persist(user);

		await this.mailerService.sendMail({
			to: user.email,
			from: this.configService.get<string>('MAIL_USERNAME'),
			subject: 'Ace Books - Verify Email',
			template: 'verify',
			context: {
				title: 'Ace Books - Verify Email',
				verificationCode: user.verificationCode,
			},
		});
	}
}
