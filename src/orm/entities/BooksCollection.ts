import { Entity, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { BaseEntity } from '@/orm/entities/BaseEntity';
import { User } from '@/orm/entities/User';
import { Book } from '@/orm/entities/Book';

@Entity()
export class BooksCollection extends BaseEntity
{
	@ManyToOne(() => User)
	user: User;

	@OneToMany(() => Book, (book) => book.collection)
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
