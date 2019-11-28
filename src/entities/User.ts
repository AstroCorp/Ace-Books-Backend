import { Entity, Property } from "mikro-orm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class User extends BaseEntity {
	@Property()
	username: string;

	@Property()
	email: string;

	@Property()
	termsAccepted = false;

	constructor(username: string, email: string) {
		super();
		this.username = username;
		this.email = email;
	}
}
