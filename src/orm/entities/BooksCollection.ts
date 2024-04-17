import { Entity, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { BaseEntity } from '@/orm/entities/BaseEntity';
import { User } from '@/orm/entities/User';
import { Book } from '@/orm/entities/Book';

@Entity()
export class BooksCollection extends BaseEntity
{
	@ManyToOne(() => User)
	user: User;

	@OneToMany(() => Book, (book) => book.booksCollection)
	books = new Collection<Book>(this);

	@Property()
	title: string;

	@Property({ nullable: true })
	image: string | null;

	@Property()
	description: string;

	constructor(user: User, title: string, image: string | null, description: string) {
		super();

		this.user = user;
		this.title = title;
		this.image = image;
		this.description = description;
	}
}
