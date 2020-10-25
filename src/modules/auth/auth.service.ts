import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from '../../modules/users/users.service';
import { User, Lang, RefreshToken } from '../../orm/entities';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(Lang)
		private readonly langRepository: EntityRepository<Lang>,

		@InjectRepository(RefreshToken)
		private readonly refreshTokenRepository: EntityRepository<RefreshToken>,

		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {
		//
	}

	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.usersService.findOne(email);

		if (user && (await bcrypt.compare(password, user.password))) {
			const { password, ...result } = user;
			return result;
		}

		return null;
	}

	private async createToken(user: User) {
		const access_payload = { sub: user.email };
		const refresh_token = uuidv4();

		const newRefreshToken = new RefreshToken(user, refresh_token);
		await this.refreshTokenRepository.persistAndFlush(newRefreshToken);

		return {
			access_token: this.jwtService.sign(access_payload),
			refresh_token,
		};
	}

	async refreshToken(email: string, refreshToken: string) {
		// Buscamos el token en la base de datos
		const dbRefreshToken = await this.refreshTokenRepository.findOne({
			token: refreshToken,
		}, ['user']) as RefreshToken;

		// Comprobamos si el token es del usuario
		if (dbRefreshToken.user.email !== email) {
			return {
				code: 400,
				message: 'invalid token',
			};
		}

		// Eliminamos el refresh token de la base de datos
		await this.refreshTokenRepository.removeAndFlush(dbRefreshToken);

		// Generamos un nuevo token
		const user = await this.usersService.findOne(email) as User;

		return await this.createToken(user);
	}

	async login(user: User) {
		return {
			code: 200,
			message: 'generated token',
			...(await this.createToken(user as User)),
		};
	}

	async register(email: string, password: string, lang: string) {
		// Si todo va bien se crea el usuario
		const dbLang = await this.langRepository.findOne({ initial: lang });
		const newUser = new User(email, password, dbLang as Lang);
		await this.usersService.create(newUser);

		return {
			code: 200,
			message: 'user created successfully',
			...(await this.createToken(newUser)),
		};
	}
}
