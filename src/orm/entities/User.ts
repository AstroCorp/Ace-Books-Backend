import { Entity, Property, Collection, OneToMany } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from '@/orm/entities/BaseEntity';
import { Book } from '@/orm/entities/Book';
import { BooksCollection } from '@/orm/entities/BooksCollection';
import { UserDTO } from '@/orm/types/entities';

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
	password: string;

	@Property()
	avatar: string | null;

	@Property()
	isAdmin: boolean;

	@Property()
	isVerified: boolean;

	constructor(userDTO: UserDTO) {
		super();

		this.email = userDTO.email;
		this.password = bcrypt.hashSync(userDTO.password, User.SALT_ROUNDS);
		this.avatar = null;
		this.isAdmin = false;
		this.isVerified = false;
	}
}
