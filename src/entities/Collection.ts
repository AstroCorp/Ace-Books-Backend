import { Entity, Property, ManyToOne } from "mikro-orm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity()
export class Collection extends BaseEntity {
	@ManyToOne("User")
	user!: User;

	@Property()
	name: string;

	@Property()
	image: string;

	@Property()
	description: string;

	constructor(name: string, image: string, description: string) {
		super();
		this.name = name;
		this.image = image;
		this.description = description;
	}
}
