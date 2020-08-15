import { Entity, Property, PrimaryKey } from "mikro-orm";

@Entity()
export class Lang {
	@PrimaryKey()
	id!: number;

	@Property()
	initial: string;

	constructor(initial: string) {
		this.initial = initial;
	}
}
