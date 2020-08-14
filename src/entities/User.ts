import { Entity, Property, ManyToOne } from "mikro-orm";
import { BaseEntity } from "./BaseEntity";
import { Lang } from "./Lang";

@Entity()
export class User extends BaseEntity {
	@ManyToOne("Lang", { default: 1 })
	lang!: Lang;

	@Property()
	email: string;

	@Property()
	password: string;

	@Property({ nullable: true })
	image?: string;

	@Property()
	isAdmin: boolean = false;

	constructor(email: string, password: string) {
		super();
		this.email = email;
		this.password = password;
	}
}
