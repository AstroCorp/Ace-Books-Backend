import { Entity, Property, PrimaryKey } from "mikro-orm";

@Entity()
export class Lang {
	@PrimaryKey()
	id!: number;

	@Property()
	name: string;

	@Property()
	initial: string;

	constructor(name: string, initial: string) {
		this.name = name;
		this.initial = initial;
	}
}
