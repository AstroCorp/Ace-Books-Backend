import { Injectable, Inject } from '@nestjs/common';
import { UuidPort, UUID_PORT } from '@/domain/auth/ports/uuid.port';
import { JwtPort, JWT_PORT } from '@/domain/auth/ports/jwt.port';
import { User } from '@/domain/common/models/User';
import { TOKEN_WRITER_REPOSITORY, TokenWriterRepositoryInterface } from '@/domain/auth/repositories/tokenWriterRepositoryInterface';
import { TokenType } from '@/domain/common/models/Token';

@Injectable()
export class GenerateUserRefreshTokenUseCase {
	constructor(
		@Inject(UUID_PORT)
		private readonly uuidService: UuidPort,

		@Inject(JWT_PORT)
		private readonly jwtService: JwtPort,

		@Inject(TOKEN_WRITER_REPOSITORY)
		private readonly tokenRepository: TokenWriterRepositoryInterface,
	) {
		//
	}

	public async execute(user: User) {
		const jti = this.uuidService.get();
		const payload = user.getDataForToken(jti);

		const token = this.jwtService.sign(payload, {
			secret: process.env.JWT_REFRESH_SECRET,
			expiresIn: process.env.JWT_REFRESH_SECRET_EXPIRES,
		});

		await this.tokenRepository.create(token, user.id, TokenType.REFRESH);

		return token;
	}
}
