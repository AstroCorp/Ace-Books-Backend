import { Inject, Injectable } from "@nestjs/common";
import { TOKEN_READER_REPOSITORY, TokenReaderRepositoryInterface } from "@/domain/auth/repositories/tokenReaderRepositoryInterface";
import { TokenType } from "@/domain/common/models/Token";

@Injectable()
export class ValidateUserRefreshTokenUseCase {
	constructor(
		@Inject(TOKEN_READER_REPOSITORY)
		private readonly tokenReaderRepository: TokenReaderRepositoryInterface,
	) {
		//
	}

	public async execute(token: string): Promise<boolean> {
		const tokenModel = await this.tokenReaderRepository.findOneByToken(token, TokenType.REFRESH);

		if (!tokenModel) {
			return false;
		}

		return !tokenModel.isRevoked;
	}
}
