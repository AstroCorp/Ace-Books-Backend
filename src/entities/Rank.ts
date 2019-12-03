import { Entity, Property, PrimaryKey } from "mikro-orm";

@Entity()
export class Rank {
	@PrimaryKey()
	id!: number;

	@Property()
	name: string;

	constructor(name: string) {
		this.name = name;
	}
}
