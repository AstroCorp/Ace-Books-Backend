import { Entity, Property, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { User } from './User';

@Entity()
export class RefreshToken
{
	@PrimaryKey()
	id!: number;

	@ManyToOne(() => User)
	user: User;

	@Property()
	token: string;

	@Property()
	expiresIn!: Date;

	constructor(user: User, token: string) {
		const expiresIn = new Date();
		expiresIn.setDate(expiresIn.getDate() + 7);

		this.user = user;
		this.token = token;
		this.expiresIn = expiresIn;
	}
}
