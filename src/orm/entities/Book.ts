import { Entity, Property, ManyToOne, Rel, rel } from '@mikro-orm/core';
import { BaseEntity } from '@/orm/entities/BaseEntity';
import { BooksCollection } from '@/orm/entities/BooksCollection';
import { User } from '@/orm/entities/User';
import type { BookDTO } from '@/orm/types/entities';

@Entity({ tableName: 'books' })
export class Book extends BaseEntity
{
	@ManyToOne(() => User)
	user: Rel<User>;

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

	constructor(bookDTO: BookDTO) {
		super();

		this.user = rel(User, bookDTO.user);
		this.title = bookDTO.title;
		this.image = bookDTO.image;
		this.description = bookDTO.description;
		this.pages = bookDTO.pages;
		this.filename = bookDTO.filename;
	}
}
