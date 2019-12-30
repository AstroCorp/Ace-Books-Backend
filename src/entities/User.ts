import { Entity, Property, ManyToOne } from "mikro-orm";
import { BaseEntity } from "./BaseEntity";
import { Rank } from "./Rank";
import { Lang } from "./Lang";

@Entity()
export class User extends BaseEntity {
	@ManyToOne("Rank")
	rank!: Rank;

	@ManyToOne("Lang")
	lang!: Lang;

	@Property()
	username: string;

	@Property()
	email: string;

	@Property()
	image: string = "";

	constructor(username: string, email: string) {
		super();
		this.username = username;
		this.email = email;
	}
}
