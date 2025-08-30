import { Inject, Injectable } from '@nestjs/common';
import { JWT_PORT, JwtPort } from '@/domain/auth/ports/jwt.port';
import { TOKEN_WRITER_REPOSITORY, TokenWriterRepositoryInterface } from '@/domain/auth/repositories/tokenWriterRepositoryInterface';
import { User } from '@/domain/common/models/User';
import { TokenType } from '@/domain/common/models/Token';
import { UUID_PORT, UuidPort } from '@/domain/auth/ports/uuid.port';

@Injectable()
export class GenerateResetPasswordUrlUseCase {
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

	public async execute(user: User): Promise<URL> {
		const jti = this.uuidService.get();
		const tokenString = this.jwtService.sign({ jti }, {
			secret: process.env.GENERIC_JWT_SECRET,
			expiresIn: process.env.GENERIC_JWT_SECRET_EXPIRES,
		});

		await this.tokenRepository.create(tokenString, user.id, TokenType.RESET);

		const frontUrl = new URL(process.env.FRONTEND_URL + '/reset-password');
		frontUrl.searchParams.append('token', tokenString);
		frontUrl.searchParams.append('email', user.email);

		return frontUrl;
	}
}
