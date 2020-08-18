import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User, Lang, RefreshToken } from "orm/entities";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "nestjs-mikro-orm";
import { EntityRepository } from "mikro-orm";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(Lang)
		private readonly langRepository: EntityRepository<Lang>,

		@InjectRepository(RefreshToken) 
		private readonly refreshTokenRepository: EntityRepository<RefreshToken>,

		@InjectRepository(User) 
		private readonly userRepository: EntityRepository<User>,

		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.usersService.findOne(email);

		if (user && await bcrypt.compare(password, user.password)) {
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
		if(!email || !refreshToken) {
			return {
				code: 400,
				message: "No has completado todos los campos.",
			};
		}

		// Comprobamos que el correo es de un usuario
		const user = await this.usersService.findOne(email);

		if(!user) {
			return {
				code: 400,
				message: "Usuario inválido.",
			};
		}

		// Comprobamos el token
		const dbRefreshToken = await this.refreshTokenRepository.findOne({
			token: refreshToken,
		});

		if(!dbRefreshToken) {
			return {
				code: 400,
				message: "Token inválido.",
			};
		}

		// Comprobamos si el token es del usuario
		if((dbRefreshToken as RefreshToken).user.email !== email) {
			return {
				code: 400,
				message: "El token no pertenece a este usuario.",
			};
		}

		// Comprobamos que el token no ha caducado
		if(new Date(dbRefreshToken.expiresIn) < new Date()) {
			return {
				code: 400,
				message: "El token ha caducado.",
			};
		}

		// Eliminamos el refresh token de la base de datos
		await this.refreshTokenRepository.removeAndFlush(dbRefreshToken);

		return await this.createToken(user);
	}

	async login(userId: number) {
		const user = await this.userRepository.findOne(userId);

		return {
			code: 200,
			message: 'Token generado',
			...await this.createToken(user as User),
		};
	}

	async register(email: string, password: string, lang: number) {
		// Campos rellenados
		if (!email || !password || !lang) {
			return {
				code: 400,
				message: "No has completado todos los campos",
			};
		}

		// El correo ya está en uso
		const user = await this.usersService.findOne(email);

		if (user) {
			return {
				code: 400,
				message: "El correo ya está en uso",
			};
		}

		// Comprobamos el idioma
		// TODO: Llevar esto a un service
		const dbLang = await this.langRepository.findOne(lang);

		if(!dbLang) {
			return {
				code: 400,
				message: "El idioma no es válido",
			};
		}

		// Si todo va bien se crea el usuario
		const newUser = new User(email, password, dbLang as Lang);
		await this.usersService.create(newUser);

		return {
			code: 200,
			message: "Usuario creado correctamente",
			...await this.createToken(newUser),
		};
	}
}
