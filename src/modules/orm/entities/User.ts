import { Entity, Property, ManyToOne, BeforeCreate, BeforeUpdate, Collection, OneToMany } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Lang } from './Lang';
import * as bcrypt from 'bcrypt';
import { Book } from './Book';
import { BooksCollection } from './BooksCollection';
import { RefreshToken } from './RefreshToken';

@Entity()
export class User extends BaseEntity 
{
	@ManyToOne(() => Lang, { default: 1 })
	lang: Lang;

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

	@Property()
	isAdmin: boolean = false;

	private tempPassword;

	constructor(email: string, password: string, lang: Lang) {
		super();

		this.email = email;
		this.tempPassword = password;
		this.lang = lang;
	}

	set password(newPassword: string) {
		this.tempPassword = newPassword;
	}

	get password() {
		return this._password;
	}

	@BeforeCreate()
	@BeforeUpdate()
	private async hashPassword() {
		if (this.tempPassword) {
			const hashedPassword: string = await new Promise((resolve, reject) => {
				const saltRounds = 10;

				bcrypt.hash(this.tempPassword, saltRounds, function (err, hash) {
					if (err) {
						reject(err);
					}
					
					resolve(hash);
				});
			});

			this._password = hashedPassword;
		}
	}
}
