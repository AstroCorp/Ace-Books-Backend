import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/application/users/users.service';
import HashPort from '@/application/auth/ports/hash.port';
import { User } from '@/infrastructure/orm/entities/User';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Token } from '@/infrastructure/orm/entities/Token';
import JwtPort from '@/application/auth/ports/jwt.port';
import { CreateUserDTO } from '@/infrastructure/auth/validation/dto/createUser.dto';
import { EmailsService } from '@/emails/emails.service';
import { TokenType } from '@/infrastructure/orm/types/entities';
import { HASH_PORT, JWT_PORT } from './ports/tokens';

@Injectable()
export class AuthService {
	constructor(
		@Inject(HASH_PORT)
		private readonly hash: HashPort,
		@Inject(JWT_PORT)
		private readonly jwt: JwtPort,
		@InjectRepository(Token)
		private readonly tokenRepository: EntityRepository<Token>,
		private readonly em: EntityManager,
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly emailsService: EmailsService,
	) {
		//
	}

	async checkIfRefreshTokenIsValid(token: string) {
		const tokenEntity = await this.tokenRepository.findOne({
			token,
			type: TokenType.REFRESH,
		});

		if (!tokenEntity) {
			return false;
		}

		return tokenEntity.isValid();
	}

	async validateUser(email: string, password: string) {
		const user = await this.usersService.findOneByEmail(email);

		if (user && this.hash.check(password, user.password)) {
			return user;
		}

		return null;
	}

	async login(user: User) {
		const tokens = await this.generateTokens(user);

		await this.em.flush();

		return tokens;
	}

	async register(body: CreateUserDTO) {
		const newUser = new User(body);
		const newUserEntity = await this.usersService.create(newUser);
		const tokens = await this.generateTokens(newUserEntity);

		await this.em.flush();

		await this.emailsService.sendVerifyAccountEmail(newUserEntity);

		return tokens;
	}

	async refresh(user: User, bearerToken: string) {
		const currentRefreshToken = bearerToken.split(' ')[1];
		const tokens = await this.generateTokens(user, currentRefreshToken);

		await this.em.flush();

		return tokens;
	}

	private async generateTokens(user: User, currentRefreshToken?: string) {
		const payload = currentRefreshToken ? this.jwt.getPayload(currentRefreshToken) : null;
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

		const access_token = await this.generateToken(user);
		const refresh_token = generateNewRefreshToken
			? await this.generateRefreshToken(user)
			: currentRefreshToken;

		return {
			access_token,
			refresh_token,
		};
	}

	private async generateToken(user: User) {
		const payload = user.getDataForToken();

		const token = await this.jwtService.signAsync(payload, {
			secret: process.env.JWT_SECRET,
			expiresIn: process.env.JWT_SECRET_EXPIRES,
		});

		return token;
	}

	private async generateRefreshToken(user: User) {
		const payload = user.getDataForToken();

		const refresh_token = await this.jwtService.signAsync(payload, {
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
