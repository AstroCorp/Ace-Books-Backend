import { Entity, Property, ManyToOne, Rel, rel, PrimaryKey, Opt } from '@mikro-orm/core';
import { User } from '@/infrastructure/orm/entities/User';
import type { TokenDTO } from '@/infrastructure/orm/types/entities';
import type { TokenType } from '@/domain/models/Token';

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

	public revoke() {
		this.isRevoked = true;
	}
}
