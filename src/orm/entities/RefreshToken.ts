import { Entity, Property, ManyToOne, PrimaryKey } from "mikro-orm";
import { User } from "./User";

@Entity()
export class RefreshToken {
	@PrimaryKey()
	id!: number;

	@ManyToOne('User')
	user: User;

	@Property()
	token: string;

	@Property({ default: "(DATETIME('NOW', '+7 DAYS'))" })
	expiresIn!: Date;

	constructor(user: User, token: string) {
		this.user = user;
		this.token = token;
	}
}
