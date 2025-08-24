import { Injectable, Inject } from '@nestjs/common';
import { JwtPort, JWT_PORT } from '@/domain/auth/ports/jwt.port';
import { User } from '@/domain/common/models/User';
import { TOKEN_WRITER_REPOSITORY, TokenWriterRepositoryInterface } from '@/domain/auth/repositories/tokenWriterRepositoryInterface';
import { TokenType } from '@/domain/common/models/Token';

@Injectable()
export class GenerateUserRefreshTokenUseCase {
	constructor(
		@Inject(JWT_PORT)
		private readonly jwtService: JwtPort,

		@Inject(TOKEN_WRITER_REPOSITORY)
		private readonly tokenRepository: TokenWriterRepositoryInterface,
	) {
		//
	}

	public async execute(user: User) {
		const payload = user.getDataForToken();

		const token = this.jwtService.sign(payload, {
			secret: process.env.JWT_REFRESH_SECRET,
			expiresIn: process.env.JWT_REFRESH_SECRET_EXPIRES,
		});

		await this.tokenRepository.create(token, user.id, TokenType.REFRESH);

		return token;
	}
}
