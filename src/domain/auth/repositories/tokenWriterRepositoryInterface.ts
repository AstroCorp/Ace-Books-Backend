import { InjectionToken } from "@nestjs/common";
import type { TokenType } from "@/domain/common/models/Token";
import { Token } from "@/domain/common/models/Token";

export const TOKEN_WRITER_REPOSITORY: InjectionToken = 'TOKEN_WRITER_REPOSITORY';

export interface TokenWriterRepositoryInterface {
	create(token: string, user: number, type: TokenType): Promise<Token>;
	revoke(token: string, type: TokenType): Promise<void>;
}
