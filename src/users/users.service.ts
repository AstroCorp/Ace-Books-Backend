import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { v4 as uuidv4 } from 'uuid';
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

		if (!user.verificationCode || user.verificationCode !== code) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		wrap(user).assign({
			verificationCode: null,
			isVerified: true,
		});
		
		await this.userRepository.persistAndFlush(user);
	}

	async resendVerificationMail(user: User) {
		user = await this.findOne(user.email) as User;

		if (user.isVerified) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}
		
		await this.generateValidationCode(user);
		await this.mailsService.sendVerifyEmail(user);
	}

	async generateValidationCode(user: User) {
		wrap(user).assign({
			verificationCode: uuidv4(),
		});
		
		await this.userRepository.persistAndFlush(user);
	}
}
