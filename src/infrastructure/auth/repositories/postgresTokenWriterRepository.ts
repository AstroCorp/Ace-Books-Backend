import { Injectable } from "@nestjs/common";
import { EntityManager } from "@mikro-orm/postgresql";
import { TokenWriterRepositoryInterface } from "@/domain/auth/repositories/tokenWriterRepositoryInterface";
import { Token as TokenEntity } from "@/infrastructure/orm/entities/Token";
import type { TokenType } from '@/domain/common/models/Token';
import { Token } from '@/domain/common/models/Token';

@Injectable()
export class PostgresTokenWriterRepository implements TokenWriterRepositoryInterface {
	constructor(private readonly em: EntityManager) {}

	async create(token: string, user: number, type: TokenType): Promise<Token> {
		const newTokenEntity = new TokenEntity({ token, user, type });

		await this.em.persist(newTokenEntity);

		return newTokenEntity.toDomainModel();
	}
}
