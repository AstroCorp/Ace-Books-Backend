import { Inject, Injectable } from "@nestjs/common";
import { TOKEN_WRITER_REPOSITORY, TokenWriterRepositoryInterface } from "@/domain/auth/repositories/tokenWriterRepositoryInterface";
import { Token, TokenType } from "@/domain/common/models/Token";

@Injectable()
export class RevokeTokenUseCase {
	constructor(
		@Inject(TOKEN_WRITER_REPOSITORY)
		private readonly tokenWriterRepository: TokenWriterRepositoryInterface,
	) {
		//
	}

	public async execute(token: string, type: TokenType): Promise<void> {
		await this.tokenWriterRepository.revoke(token, type);
	}
}
