import { Inject, Injectable } from "@nestjs/common";
import { TOKEN_READER_REPOSITORY, TokenReaderRepositoryInterface } from "@/domain/auth/repositories/tokenReaderRepositoryInterface";
import { Token, TokenType } from "@/domain/common/models/Token";

@Injectable()
export class GetTokenUseCase {
	constructor(
		@Inject(TOKEN_READER_REPOSITORY)
		private readonly tokenReaderRepository: TokenReaderRepositoryInterface,
	) {
		//
	}

	public async execute(token: string, type: TokenType): Promise<Token | null> {
		const refreshToken = await this.tokenReaderRepository.findOneByToken(token, type);

		return refreshToken;
	}
}
