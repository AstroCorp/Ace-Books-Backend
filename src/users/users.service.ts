import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../orm/entities';
import { MailsService } from '../mails/mails.service';

@Injectable()
export class UsersService
{
	constructor(
		@InjectRepository(User)
		private readonly userRepository: EntityRepository<User>,

		private readonly mailsService: MailsService,
	) {
		//
	}

	async findOne(email: string): Promise<User | null> {
		return await this.userRepository.findOne({
			email,
		});
	}

	async create(user: User): Promise<void> {
		return await this.userRepository.persistAndFlush(user);
	}

	async verifyEmail(email: string, code: string): Promise<void> {
		const user = (await this.findOne(email)) as User;

		if (user.codes?.email_code !== code) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		wrap(user).assign({
			codes: {
				...user.codes,
				email_code: null,
			},
			isVerified: true,
		});

		await this.userRepository.persistAndFlush(user);
	}

	async resendVerificationMail(email: string): Promise<void> {
		const user = (await this.findOne(email)) as User;

		if (user.isVerified) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		await this.generateCode(user, 'email_code');
		await this.mailsService.sendVerifyEmail(user);
	}

	async resetPassword(email: string, passwordCode: string, newPassword: string): Promise<void> {
		const user = (await this.findOne(email)) as User;

		if (user.codes?.password_code !== passwordCode) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		wrap(user).assign({
			codes: {
				...user.codes,
				password_code: null,
			},
			password: newPassword,
		});

		await this.userRepository.persistAndFlush(user);
	}

	async resendResetMail(email: string): Promise<void> {
		const user = await this.findOne(email);

		if (user === null) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		await this.generateCode(user, 'password_code');
		await this.mailsService.sendResetEmail(user);
	}

	async generateCode(user: User, codeType: string): Promise<void> {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		const length = 20;
		let code = '';

		for (let i = 1; i <= length; i++) {
			code += characters.charAt(Math.floor(Math.random() * characters.length));

			if (i < length && i % 5 === 0) {
				code += '-';
			}
		}

		wrap(user).assign({
			codes: {
				...user.codes,
				[codeType]: code,
			},
		});

		await this.userRepository.persistAndFlush(user);
	}
}
