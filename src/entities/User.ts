import { Entity, Property, ManyToOne } from "mikro-orm";
import { BaseEntity } from "./BaseEntity";
import { Rank } from "./Rank";
import { Lang } from "./Lang";

@Entity()
export class User extends BaseEntity {
	@ManyToOne("Rank")
	rank_id!: Rank;

	@ManyToOne("Lang")
	lang_id!: Lang;

	@Property()
	username: string;

	@Property()
	email: string;

	@Property()
	image: string;

	@Property()
	termsAccepted = false;

	constructor(username: string, email: string, image: string) {
		super();
		this.username = username;
		this.email = email;
		this.image = image;
	}
}
