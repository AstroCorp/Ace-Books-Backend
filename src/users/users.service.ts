import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from '@/orm/entities/User';
import { MailsService } from '@/mails/mails.service';
import { extractSignData } from '@/auth/utils/jwt';
import { SignType } from '@/auth/types/signPayload';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: EntityRepository<User>,
		private readonly em: EntityManager,
		private readonly mailsService: MailsService,
		private readonly jwtService: JwtService,
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

	async resendVerificationEmail(user: User) {
		if (user.isVerified) {
			return;
		}

		await this.mailsService.sendVerifyEmail(user);
	}

	async resendResetPasswordEmail(email: string) {
		const user = await this.findOneByEmail(email);

		if (!user) {
			return;
		}

		await this.mailsService.sendResetEmail(user);
	}

	async verifyEmail(user: User, token: string) {
		const isValidSign = this.jwtService.verify(token, {
			secret: process.env.URL_SIGNED_SECRET,
		});

		if (!isValidSign) {
			throw new HttpException('Invalid verification token', HttpStatus.BAD_REQUEST);
		}

		if (user.isVerified) {
			return;
		}

		const payload = extractSignData(token);

		if (user.id !== payload.user_id || payload.type !== SignType.VerifyEmail) {
			throw new HttpException('Invalid verification token', HttpStatus.BAD_REQUEST);
		}

		user.isVerified = true;

		await this.em.flush();
	}

	async resetPassword(token: string, password: string) {
		const isValidSign = this.jwtService.verify(token, {
			secret: process.env.URL_SIGNED_SECRET,
		});

		if (!isValidSign) {
			throw new HttpException('Invalid reset password token', HttpStatus.BAD_REQUEST);
		}

		const payload = extractSignData(token);
		const user = await this.findOneById(payload.user_id);

		if (!user || payload.type !== SignType.ResetPassword) {
			throw new HttpException('Invalid reset password token', HttpStatus.BAD_REQUEST);
		}

		user.password = password;

		await this.em.flush();
	}
}
