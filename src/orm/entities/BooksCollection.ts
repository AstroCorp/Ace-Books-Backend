import { Entity, Property, ManyToOne, OneToMany, Collection, Rel, rel } from '@mikro-orm/core';
import { BaseEntity } from '@/orm/entities/BaseEntity';
import { User } from '@/orm/entities/User';
import { Book } from '@/orm/entities/Book';
import type { BooksCollectionDTO } from '@/orm/types/entities';

@Entity({ tableName: 'books_collections'})
export class BooksCollection extends BaseEntity
{
	@ManyToOne(() => User)
	user: Rel<User>;

	@OneToMany(() => Book, (book) => book.booksCollection)
	books = new Collection<Book>(this);

	@Property()
	title: string;

	@Property({ nullable: true })
	image: string | null;

	@Property()
	description: string;

	constructor(booksCollectionDTO: BooksCollectionDTO) {
		super();

		this.user = rel(User, booksCollectionDTO.user);
		this.title = booksCollectionDTO.title;
		this.image = booksCollectionDTO.image;
		this.description = booksCollectionDTO.description;
	}
}
