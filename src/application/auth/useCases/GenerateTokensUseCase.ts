import { Injectable, Inject } from '@nestjs/common';
import { User } from '@/infrastructure/orm/entities/User';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Token } from '@/infrastructure/orm/entities/Token';
import JwtService from '@/domain/auth/ports/jwt.service';
import { TokenType } from '@/infrastructure/orm/types/entities';
import { JWT_PORT } from '@/domain/auth/ports/tokens';

@Injectable()
export class AuthService {
	constructor(
		@Inject(JWT_PORT)
		private readonly jwtService: JwtService,

		@InjectRepository(Token)
		private readonly tokenRepository: EntityRepository<Token>,

		private readonly em: EntityManager,
	) {
		//
	}

	private async execute(user: User, currentRefreshToken?: string) {
		const payload = currentRefreshToken ? this.jwtService.getPayload(currentRefreshToken) : null;
		const expMs = payload ? payload.exp * 1000 : 0;

		// Generamos un refresh token si el actual tiene 5 días de antigüedad
		const generateNewRefreshToken = expMs - Date.now() < 432000000;

		// Buscamos el token en la base de datos y lo marcamos como revocado
		// no hacemos flush ya que este se hará en generateRefreshToken
		if (generateNewRefreshToken) {
			const currentRefreshTokenEntity = await this.tokenRepository.findOne({
				token: currentRefreshToken,
				type: TokenType.REFRESH,
			});
			currentRefreshTokenEntity?.revoke();
		}

		const access_token = this.generateToken(user);
		const refresh_token = generateNewRefreshToken
			? this.generateRefreshToken(user)
			: currentRefreshToken;

		await this.em.flush();

		return {
			access_token,
			refresh_token,
		};
	}

	private generateToken(user: User) {
		const payload = user.getDataForToken();

		const token = this.jwtService.sign(payload, {
			secret: process.env.JWT_SECRET,
			expiresIn: process.env.JWT_SECRET_EXPIRES,
		});

		return token;
	}

	private generateRefreshToken(user: User) {
		const payload = user.getDataForToken();

		const refresh_token = this.jwtService.sign(payload, {
			secret: process.env.JWT_REFRESH_SECRET,
			expiresIn: process.env.JWT_REFRESH_SECRET_EXPIRES,
		});

		const newRefreshToken = new Token({
			token: refresh_token,
			user: user.id,
			type: TokenType.REFRESH,
		});

		// Solo almacenamos los refresh tokens, ya que son de larga duración
		this.em.persist(newRefreshToken);

		return refresh_token;
	}
}
