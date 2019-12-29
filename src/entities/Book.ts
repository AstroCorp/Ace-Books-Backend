import { Entity, Property, ManyToOne } from "mikro-orm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { Collection } from "./Collection";

@Entity()
export class Book extends BaseEntity {
	@ManyToOne("User")
	user!: User;

	@ManyToOne("Collection")
	collection!: Collection;

	@Property()
	name: string;

	@Property()
	image: string;

	@Property()
	description: string;

	@Property()
	filename: string;

	constructor(
		name: string,
		image: string,
		description: string,
		filename: string,
	) {
		super();
		this.name = name;
		this.image = image;
		this.description = description;
		this.filename = filename;
	}
}
