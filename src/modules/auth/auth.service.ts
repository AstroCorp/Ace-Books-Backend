import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { UsersService } from '../../modules/users/users.service';
import { User, Lang, RefreshToken } from '../orm/entities';

@Injectable()
export class AuthService 
{
	constructor(
		@InjectRepository(Lang)
		private readonly langRepository: EntityRepository<Lang>,

		@InjectRepository(RefreshToken)
		private readonly refreshTokenRepository: EntityRepository<RefreshToken>,

		private readonly usersService: UsersService,
	) {
		//
	}

	async refreshToken(email: string, refreshToken: string) {
		const dbRefreshToken = await this.refreshTokenRepository.findOne({
			token: refreshToken,
		}) as RefreshToken;

		const user = await this.usersService.findOne(email) as User;

		// Eliminamos el refresh token de la base de datos
		await this.refreshTokenRepository.removeAndFlush(dbRefreshToken);

		// Generamos un nuevo token
		return await this.usersService.createToken(user);
	}

	async login(user: User) {
		return {
			code: 200,
			message: 'generated token',
			...(await this.usersService.createToken(user as User)),
		};
	}

	async register(email: string, password: string, lang: string) {
		// Si todo va bien se crea el usuario
		const dbLang = await this.langRepository.findOne({ initial: lang });
		const newUser = new User(email, password, dbLang as Lang);
		
		await this.usersService.create(newUser);

		await this.usersService.sendVerifyEmail(newUser);

		return {
			code: 200,
			message: 'user created successfully',
			...(await this.usersService.createToken(newUser)),
		};
	}
}
