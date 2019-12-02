import { Entity, Property, ManyToOne } from "mikro-orm";
import { BaseEntity } from "./BaseEntity";
import { Book } from "./Book";

@Entity()
export class Bookmark extends BaseEntity {
	@ManyToOne("Book")
	book_id!: Book;

	@Property()
	color: string;

	@Property()
	page: number;

	@Property()
	comment: string;

	constructor(color: string, page: number, comment: string) {
		super();
		this.color = color;
		this.page = page;
		this.comment = comment;
	}
}
