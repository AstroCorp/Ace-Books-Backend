import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { Book } from "./Book";

@Entity()
export class Bookmark extends BaseEntity {
	@ManyToOne("Book")
	book: Book;

	@Property({ default: 'FEEFC3' })
	color: string;

	@Property()
	page: number;

	@Property()
	comment: string;

	constructor(book: Book, color: string, page: number, comment: string) {
		super();

		this.book = book;
		this.color = color;
		this.page = page;
		this.comment = comment;
	}
}
