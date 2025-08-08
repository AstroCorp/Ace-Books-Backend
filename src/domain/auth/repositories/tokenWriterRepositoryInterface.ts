import { TokenType } from "@/infrastructure/orm/types/entities";

export interface TokenWriterRepositoryInterface {
	create(token: string, user: number, type: TokenType): Promise<void>;
}
