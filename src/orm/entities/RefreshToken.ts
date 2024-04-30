import { Entity, Property, ManyToOne, Rel, rel, PrimaryKey, Opt } from '@mikro-orm/core';
import { User } from '@/orm/entities/User';
import type { RefreshTokenDTO } from '@/orm/types/entities';
import { extractTokenData } from '@/auth/utils/jwt';

@Entity({ tableName: 'refresh_tokens' })
export class RefreshToken
{
	@ManyToOne(() => User)
	user: Rel<User>;

	@PrimaryKey()
	token: string;

	@Property()
	isRevoked: boolean;

	@Property()
	createdAt: Date & Opt = new Date();

	@Property({ onUpdate: () => new Date() })
	updatedAt: Date & Opt = new Date();

	constructor(refreshTokenDTO: RefreshTokenDTO) {
		this.user = rel(User, refreshTokenDTO.user);
		this.token = refreshTokenDTO.token;
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
