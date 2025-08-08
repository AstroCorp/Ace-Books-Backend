import { Injectable } from "@nestjs/common";
import { EntityManager } from "@mikro-orm/postgresql";
import { TokenWriterRepositoryInterface } from "@/domain/auth/repositories/tokenWriterRepositoryInterface";
import { Token } from "@/infrastructure/orm/entities/Token";
import { TokenType } from "@/infrastructure/orm/types/entities";

@Injectable()
export class PostgresTokenWriterRepository implements TokenWriterRepositoryInterface {
	constructor(private readonly em: EntityManager) {}

	async create(token: string, user: number, type: TokenType): Promise<void> {
		const newToken = new Token({ token, user, type });

		await this.em.persist(newToken);
	}
}
