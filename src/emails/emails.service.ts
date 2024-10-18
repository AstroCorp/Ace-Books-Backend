import * as fs from 'node:fs';
import { DateTime } from 'luxon';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from '@/orm/entities/User';
import { UsersService } from '@/users/users.service';
import { generateUrlSigned } from '@/auth/utils/sign';
import { Token } from '@/orm/entities/Token';
import { TokenType } from '@/orm/types/entities';
import { generateHash } from '@/auth/utils/hash';

@Injectable()
export class EmailsService {
	constructor(
		private readonly em: EntityManager,
		private readonly mailerService: MailerService,
		private readonly userService: UsersService,
		private readonly jwtService: JwtService,
	) {
		//
	}

	async sendVerifyAccountEmail(user: User) {
		const userId = user.id.toString();
		const hash = generateHash(user.email);

		const verifyUrl = new URL(process.env.BACKEND_URL + '/users/verify-email');
		verifyUrl.searchParams.append('userId', userId);
		verifyUrl.searchParams.append('hash', hash);

		const expiration = DateTime.now().plus({ minutes: parseInt(process.env.GENERIC_JWT_SECRET_EXPIRES) }).toJSDate();
		const urlSigned = generateUrlSigned(verifyUrl, expiration);

		// Añadimos los parámetros de la URL firmada a la URL del frontend para que
		// sean usados al hacer la petición de reseteo de contraseña
		const frontUrl = new URL(process.env.FRONTEND_URL + '/verify-email');

		Array.from(urlSigned.searchParams.entries()).forEach(([key, value]) => {
			frontUrl.searchParams.append(key, value);
		});

		return this.mailerService.sendMail({
			to: user.email,
			from: process.env.MAIL_USERNAME,
			subject: 'Ace Books - Verify Email',
			template: 'verify',
			context: {
				title: 'Ace Books - Verify Email',
				url: frontUrl.toString(),
			},
			attachments: [
				{
					filename: 'logo.png',
					content: fs.createReadStream(__dirname + '/icons/ace_logo.png'),
					cid: 'logo',
				},
			],
		});
	}

	async sendResetEmail(user: User) {
		const tokenString = await this.jwtService.signAsync({}, {
			secret: process.env.GENERIC_JWT_SECRET,
			expiresIn: process.env.GENERIC_JWT_SECRET_EXPIRES,
		});
		const newResetToken = new Token({
			token: tokenString,
			user: user.id,
			type: TokenType.RESET,
		});

		this.em.persist(newResetToken);

		await this.em.flush();

		// Solo se envía el token, el email lo tiene que poner el usuario
		const frontUrl = new URL(process.env.FRONTEND_URL + '/reset-password');
		frontUrl.searchParams.append('token', tokenString);

		return this.mailerService.sendMail({
			to: user.email,
			from: process.env.MAIL_USERNAME,
			subject: 'Ace Books - Reset Password',
			template: 'reset',
			context: {
				title: 'Ace Books - Reset Password',
				url: frontUrl.toString(),
			},
			attachments: [
				{
					filename: 'logo.png',
					content: fs.createReadStream(__dirname + '/icons/ace_logo.png'),
					cid: 'logo',
				},
			],
		});
	}

	async resendVerifyAccountEmail(user: User) {
		if (user.isVerified) return;

		await this.sendVerifyAccountEmail(user);
	}

	async resendResetPasswordEmail(email: string) {
		const user = await this.userService.findOneByEmail(email);

		if (!user) return;

		await this.sendResetEmail(user);
	}
}
