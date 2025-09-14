import { Entity, Property, ManyToOne, Rel, rel, PrimaryKey, Opt } from "@mikro-orm/core";
import { User } from "@/infrastructure/orm/entities/User";
import type { TokenDTO } from "@/infrastructure/orm/types/entities";
import type { TokenType } from "@/domain/common/models/Token";
import { Token as TokenModel } from "@/domain/common/models/Token";
import { Payload } from "@/infrastructure/auth/types/jwt";

@Entity({ tableName: 'tokens' })
export class Token
{
	@ManyToOne(() => User)
	user: Rel<User>;

	@PrimaryKey()
	token: string;

	@Property()
	type: TokenType;

	@Property()
	isRevoked: boolean;

	@Property()
	createdAt: Date & Opt = new Date();

	@Property({ onUpdate: () => new Date() })
	updatedAt: Date & Opt = new Date();

	constructor(tokenDTO: TokenDTO) {
		this.user = rel(User, tokenDTO.user);
		this.token = tokenDTO.token;
		this.type = tokenDTO.type;
		this.isRevoked = false;
	}

	public toDomainModel(tokenPayload: Payload): TokenModel {
		return new TokenModel({
			user: this.user.id,
			token: this.token,
			type: this.type,
			payload: tokenPayload,
			isRevoked: this.isRevoked,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		});
	}
}
