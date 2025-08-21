import { InjectionToken } from "@nestjs/common";
import type { TokenType } from '@/domain/models/Token';
import { Token } from '@/domain/models/Token';

export const TOKEN_WRITER_REPOSITORY: InjectionToken = 'TOKEN_WRITER_REPOSITORY';

export interface TokenWriterRepositoryInterface {
	create(token: string, user: number, type: TokenType): Promise<Token>;
}
