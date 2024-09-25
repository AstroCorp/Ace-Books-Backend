import { Entity, Property, ManyToOne, Rel, rel, PrimaryKey, Opt } from '@mikro-orm/core';
import { User } from '@/orm/entities/User';
import type { TokenDTO, TokenType } from '@/orm/types/entities';
import { extractTokenData } from '@/auth/utils/jwt';

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

	public isValid() {
		const { exp } = extractTokenData(this.token);

		// Date.now() es en milisegundos y exp en segundos,
		// por eso se multiplica por 1000
		const isExpired = Date.now() >= exp * 1000;

		return !this.isRevoked && !isExpired;
	}

	public revoke() {
		this.isRevoked = true;
	}
}
