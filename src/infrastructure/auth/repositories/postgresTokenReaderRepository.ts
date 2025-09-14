import { Injectable } from "@nestjs/common";
import { EntityManager } from "@mikro-orm/postgresql";
import { TokenReaderRepositoryInterface } from "@/domain/auth/repositories/tokenReaderRepositoryInterface";
import { Token as TokenEntity } from "@/infrastructure/orm/entities/Token";
import type { TokenType } from "@/domain/common/models/Token";
import { Token } from "@/domain/common/models/Token";
import JwtService from "@/infrastructure/auth/services/jwt.service";

@Injectable()
export class PostgresTokenReaderRepository implements TokenReaderRepositoryInterface {
	constructor(
		private readonly em: EntityManager,
		private readonly jwtService: JwtService,
	) {
		//
	}

	async findOneByToken(token: string, type: TokenType): Promise<Token | null> {
		const tokenEntity = await this.em.findOne(TokenEntity, { token, type });

		if (!tokenEntity) {
			return null;
		}

		const tokenPayload = this.jwtService.getPayload(token);

		return tokenEntity.toDomainModel(tokenPayload);
	}
}
