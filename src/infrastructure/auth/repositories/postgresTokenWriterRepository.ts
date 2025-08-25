import { Injectable } from "@nestjs/common";
import { EntityManager } from "@mikro-orm/postgresql";
import { TokenWriterRepositoryInterface } from "@/domain/auth/repositories/tokenWriterRepositoryInterface";
import { Token as TokenEntity } from "@/infrastructure/orm/entities/Token";
import type { TokenType } from '@/domain/common/models/Token';
import { Token } from '@/domain/common/models/Token';
import JwtService from "@/infrastructure/auth/services/jwt.service";

@Injectable()
export class PostgresTokenWriterRepository implements TokenWriterRepositoryInterface {
	constructor(
		private readonly em: EntityManager,
		private readonly jwtService: JwtService,
	) {
		//
	}

	async create(token: string, user: number, type: TokenType): Promise<Token> {
		const newTokenEntity = new TokenEntity({ token, user, type });

		await this.em.persist(newTokenEntity).flush();

		const tokenPayload = this.jwtService.getPayload(token);

		return newTokenEntity.toDomainModel(tokenPayload);
	}
}
