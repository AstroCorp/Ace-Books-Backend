import { Entity, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { BaseEntity } from '@/orm/entities/BaseEntity';
import { User } from '@/orm/entities/User';
import { Book } from '@/orm/entities/Book';
import { BooksCollectionDTO } from '@/orm/types/entities';

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

	constructor(booksCollectionDTO: BooksCollectionDTO) {
		super();

		this.user = booksCollectionDTO.user;
		this.title = booksCollectionDTO.title;
		this.image = booksCollectionDTO.image;
		this.description = booksCollectionDTO.description;
	}
}
