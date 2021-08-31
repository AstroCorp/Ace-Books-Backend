import { Entity, Property, BeforeCreate, BeforeUpdate, Collection, OneToMany } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from './BaseEntity';
import { Book } from './Book';
import { BooksCollection } from './BooksCollection';
import { RefreshToken } from './RefreshToken';

@Entity()
export class User extends BaseEntity
{
	@OneToMany(() => Book, (book) => book.user)
	books = new Collection<Book>(this);

	@OneToMany(() => BooksCollection, (booksCollections) => booksCollections.user)
	booksCollections = new Collection<BooksCollection>(this);

	@OneToMany(() => RefreshToken, (refreshTokens) => refreshTokens.user)
	refreshTokens = new Collection<RefreshToken>(this);

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

	@Property({ type: 'json', nullable: true })
	codes?: { email_code: string | null; password_code: string | null };

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
