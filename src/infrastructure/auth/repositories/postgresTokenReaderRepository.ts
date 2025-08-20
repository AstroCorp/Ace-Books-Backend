import { Injectable } from "@nestjs/common";
import { EntityManager } from "@mikro-orm/postgresql";
import { TokenReaderRepositoryInterface } from "@/domain/auth/repositories/tokenReaderRepositoryInterface";
import { Token as TokenEntity } from "@/infrastructure/orm/entities/Token";
import type { TokenType } from '@/domain/models/Token';
import { Token } from "@/domain/models/Token";

@Injectable()
export class PostgresTokenReaderRepository implements TokenReaderRepositoryInterface {
	constructor(private readonly em: EntityManager) {}

	async findOneByToken(token: string, type: TokenType): Promise<Token | null> {
		const tokenEntity = await this.em.findOne(TokenEntity, { token, type });

		if (!tokenEntity) {
			return null;
		}

		return tokenEntity.toDomainModel();
	}
}
