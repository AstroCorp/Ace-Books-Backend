import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User, Lang, RefreshToken } from '../orm/entities';
import { MailsService } from '../mails/mails.service';

@Injectable()
export class AuthService 
{
	constructor(
		@InjectRepository(Lang)
		private readonly langRepository: EntityRepository<Lang>,

		@InjectRepository(RefreshToken)
		private readonly refreshTokenRepository: EntityRepository<RefreshToken>,

		private readonly jwtService: JwtService,

		private readonly usersService: UsersService,

		private readonly mailsService: MailsService,
	) {
		//
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

	async refreshToken(email: string, refreshToken: string) {
		const dbRefreshToken = await this.refreshTokenRepository.findOne({
			token: refreshToken,
		}) as RefreshToken;

		const user = await this.usersService.findOne(email) as User;

		// Eliminamos el refresh token de la base de datos
		await this.refreshTokenRepository.removeAndFlush(dbRefreshToken);

		// Generamos un nuevo token
		return await this.createToken(user);
	}

	async login(user: User) {
		return {
			code: 200,
			message: 'generated token',
			...(await this.createToken(user)),
		};
	}

	async register(email: string, password: string, lang: string) {
		// Si todo va bien se crea el usuario
		const dbLang = await this.langRepository.findOne({ initial: lang });
		const newUser = new User(email, password, dbLang as Lang);
		
		await this.usersService.create(newUser);

		await this.mailsService.sendVerifyEmail(newUser);

		return {
			code: 200,
			message: 'user created successfully',
			...(await this.createToken(newUser)),
		};
	}
}
