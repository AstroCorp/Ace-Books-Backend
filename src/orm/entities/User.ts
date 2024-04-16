import { Entity, Property, BeforeCreate, BeforeUpdate, Collection, OneToMany } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from '@/orm/entities/BaseEntity';
import { Book } from '@/orm/entities/Book';
import { BooksCollection } from '@/orm/entities/BooksCollection';

@Entity()
export class User extends BaseEntity
{
	private static readonly SALT_ROUNDS = 10;

	@OneToMany(() => Book, (book) => book.user)
	books = new Collection<Book>(this);

	@OneToMany(() => BooksCollection, (booksCollections) => booksCollections.user)
	booksCollections = new Collection<BooksCollection>(this);

	@Property()
	email: string;

	@Property()
	password!: string;

	@Property({ nullable: true })
	avatar?: string;

	@Property({ default: false })
	isAdmin!: boolean;

	@Property({ default: false })
	isVerified!: boolean;

	constructor(email: string, password: string) {
		super();

		this.email = email;
		this.password = bcrypt.hashSync(password, User.SALT_ROUNDS);
	}
}
