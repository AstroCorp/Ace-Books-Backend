import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '@/orm/entities/BaseEntity';
import { BooksCollection } from '@/orm/entities/BooksCollection';
import { User } from '@/orm/entities/User';


@Entity()
export class Book extends BaseEntity
{
	@ManyToOne(() => User)
	user: User;

	@ManyToOne({ entity: () => BooksCollection, nullable: true })
	booksCollection: BooksCollection | null;

	@Property()
	title: string;

	@Property({ nullable: true })
	image: string | null;

	@Property()
	description: string;

	@Property()
	pages: number;

	@Property()
	filename: string;

	constructor(user: User, title: string, image: string | null, description: string, pages: number, filename: string) {
		super();

		this.user = user;
		this.title = title;
		this.image = image;
		this.description = description;
		this.pages = pages;
		this.filename = filename;
	}
}
