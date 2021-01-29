import { Injectable } from '@nestjs/common';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { User } from '../orm/entities';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class MailsService 
{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: EntityRepository<User>,
        
        private readonly mailerService: MailerService,

		private readonly configService: ConfigService,
    ) {
        //
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
