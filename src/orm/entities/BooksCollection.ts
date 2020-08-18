import { Entity, Property, ManyToOne, OneToMany, Collection } from "mikro-orm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { Book } from "./Book";

@Entity()
export class BooksCollection extends BaseEntity {
	@ManyToOne("User")
	user: User;

	@OneToMany('Book', 'collection')
	books = new Collection<Book>(this);

	@Property()
	name: string;

	@Property({ nullable: true })
	image: string;

	@Property()
	description: string;

	constructor(user: User, name: string, image: string, description: string) {
		super();

		this.user = user;
		this.name = name;
		this.image = image;
		this.description = description;
	}
}
