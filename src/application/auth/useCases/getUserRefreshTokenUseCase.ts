import { Inject, Injectable } from '@nestjs/common';
import { TOKEN_READER_REPOSITORY, TokenReaderRepositoryInterface } from '@/domain/auth/repositories/tokenReaderRepositoryInterface';
import { Token, TokenType } from '@/domain/common/models/Token';

@Injectable()
export class GetUserRefreshTokenUseCase {
	constructor(
		@Inject(TOKEN_READER_REPOSITORY)
		private readonly tokenReaderRepository: TokenReaderRepositoryInterface,
	) {
		//
	}

	public async execute(token: string): Promise<Token | null> {
		const refreshToken = await this.tokenReaderRepository.findOneByToken(token, TokenType.REFRESH);

		return refreshToken;
	}
}
