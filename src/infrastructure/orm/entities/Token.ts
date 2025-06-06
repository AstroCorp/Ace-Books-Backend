import { Entity, Property, ManyToOne, Rel, rel, PrimaryKey, Opt } from '@mikro-orm/core';
import { User } from '@/infrastructure/orm/entities/User';
import type { TokenDTO, TokenType } from '@/infrastructure/orm/types/entities';
import Jwt from '@/infrastructure/auth/utils/jwt';

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
		const { exp } = new Jwt().getPayload(this.token);

		// Date.now() es en milisegundos y exp en segundos,
		// por eso se multiplica por 1000
		const isExpired = Date.now() >= exp * 1000;

		return !this.isRevoked && !isExpired;
	}

	public revoke() {
		this.isRevoked = true;
	}
}
