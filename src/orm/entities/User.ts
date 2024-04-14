import { Entity, Property, BeforeCreate, BeforeUpdate, Collection, OneToMany } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from '@/orm/entities/BaseEntity';
import { Book } from '@/orm/entities/Book';
import { BooksCollection } from '@/orm/entities/BooksCollection';

@Entity()
export class User extends BaseEntity
{
	@OneToMany(() => Book, (book) => book.user)
	books = new Collection<Book>(this);

	@OneToMany(() => BooksCollection, (booksCollections) => booksCollections.user)
	booksCollections = new Collection<BooksCollection>(this);

	@Property()
	email: string;

	@Property({ name: 'password' })
	private _password!: string;

	@Property({ nullable: true })
	image?: string;

	@Property({ default: false })
	isAdmin!: boolean;

	@Property({ default: false })
	isVerified!: boolean;

	private tempPassword;

	constructor(email: string, password: string) {
		super();

		this.email = email;
		this.tempPassword = password;
	}

	set password(newPassword: string) {
		this.tempPassword = newPassword;
	}

	get password(): string {
		return this._password;
	}

	@BeforeCreate()
	@BeforeUpdate()
	private async hashPassword() {
		if (this.tempPassword) {
			const saltRounds = 10;
			const hashedPassword = await bcrypt.hash(this.tempPassword, saltRounds);

			this._password = hashedPassword;
		}
	}
}
