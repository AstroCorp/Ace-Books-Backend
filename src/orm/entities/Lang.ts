import { Entity, Property, PrimaryKey, Collection, OneToMany } from "@mikro-orm/core";
import { User } from "./User";

@Entity()
export class Lang {
	@PrimaryKey()
	id!: number;

	@Property()
	initial: string;

	@OneToMany('User')
	users = new Collection<User>(this);

	constructor(initial: string) {
		this.initial = initial;
	}
}
