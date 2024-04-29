import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { passwordCompare } from '@/auth/utils/bcrypt';
import { User } from '@/orm/entities/User';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { RefreshToken } from '@/orm/entities/RefreshToken';
import { extractTokenData } from '@/auth/utils/jwt';
import { CreateUserDTO } from '@/auth/validation/dto/createUser.dto';
import { MailsService } from '@/mails/mails.service';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(RefreshToken)
		private readonly refreshTokenRepository: EntityRepository<RefreshToken>,
		private readonly em: EntityManager,
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly mailsService: MailsService,
	) {
		//
	}

	async checkIfRefreshTokenIsValid(token: string) {
		const tokenEntity = await this.refreshTokenRepository.findOne({ token });

		if (!tokenEntity) {
			return false;
		}

		return tokenEntity.isValid();
	}

	async validateUser(email: string, password: string) {
		const user = await this.usersService.findOneByEmail(email);

		if (user && passwordCompare(password, user.password)) {
			return user;
		}

		return null;
	}

	async login(user: User) {
		const tokens = await this.generateTokens(user);

		await this.em.flush();

		return {
			...tokens,
			user: user.getData(),
		};
	}

	async register(body: CreateUserDTO) {
		const newUser = new User(body);
		const newUserEntity = await this.usersService.create(newUser);
		const tokens = await this.generateTokens(newUserEntity);

		await this.em.flush();

		await this.mailsService.sendVerifyEmail(newUserEntity);

		return {
			...tokens,
			user: newUserEntity.getData(),
		};
	}

	async refresh(user: User, bearerToken: string) {
		const currentRefreshToken = bearerToken.split(' ')[1];
		const tokens = await this.generateTokens(user, currentRefreshToken);

		await this.em.flush();

		return {
			...tokens,
			user: user.getData(),
		};
	}

	private async generateTokens(user: User, currentRefreshToken?: string) {
		const payload = currentRefreshToken ? extractTokenData(currentRefreshToken) : null;
		const expMs = payload ? payload.exp * 1000 : 0;

		// Generamos un refresh token si el actual tiene 5 días de antigüedad
		const generateNewRefreshToken = expMs - Date.now() < 432000000;

		// Buscamos el token en la base de datos y lo marcamos como revocado
		// no hacemos flush ya que este se hará en generateRefreshToken
		if (generateNewRefreshToken) {
			const currentRefreshTokenEntity = await this.refreshTokenRepository.findOne({ token: currentRefreshToken });
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
		const payload = {
			user_id: user.id,
		};

		const token = await this.jwtService.signAsync(payload, {
			secret: process.env.JWT_SECRET,
			expiresIn: process.env.JWT_SECRET_EXPIRES,
		});

		return token;
	}

	private async generateRefreshToken(user: User) {
		const payload = {
			user_id: user.id,
		};

		const refresh_token = await this.jwtService.signAsync(payload, {
			secret: process.env.JWT_REFRESH_SECRET,
			expiresIn: process.env.JWT_REFRESH_SECRET_EXPIRES,
		});

		const newRefreshToken = new RefreshToken({
			token: refresh_token,
			user: user.id,
		});

		// Solo almacenamos los refresh tokens, ya que son de larga duración
		this.em.persist(newRefreshToken);

		return refresh_token;
	}
}
