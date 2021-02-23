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

	async findOne(email: string) {
		return await this.userRepository.findOne({
			email,
		});
	}

	async create(user: User) {
		return await this.userRepository.persistAndFlush(user);
	}

	async verifyEmail(user: User, code: string) {
		user = await this.findOne(user.email) as User;

		if (user.verificationCodes?.email_code !== code) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		wrap(user).assign({
			verificationCodes: {
				...user.verificationCodes,
				email_code: null,
			},
			isVerified: true,
		});
		
		await this.userRepository.persistAndFlush(user);
	}

	async resendVerificationMail(user: User) {
		user = await this.findOne(user.email) as User;

		if (user.isVerified) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}
		
		await this.generateValidationCode(user, 'email_code');
		await this.mailsService.sendVerifyEmail(user);
	}

	async generateValidationCode(user: User, codeType: string) {
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
			verificationCodes: {
				...user.verificationCodes,
				[codeType]: code,
			},
		});
		
		await this.userRepository.persistAndFlush(user);
	}
}
