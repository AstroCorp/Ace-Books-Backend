import { InjectionToken } from "@nestjs/common";
import type { Token, TokenType } from "@/domain/common/models/Token";

export const TOKEN_READER_REPOSITORY: InjectionToken = 'TOKEN_READER_REPOSITORY';

export interface TokenReaderRepositoryInterface {
	findOneByToken(token: string, type: TokenType): Promise<Token | null>;
}
