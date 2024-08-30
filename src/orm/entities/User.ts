import { Entity, Property, Collection, OneToMany } from '@mikro-orm/core';
import { BaseEntity } from '@/orm/entities/BaseEntity';
import { Book } from '@/orm/entities/Book';
import { BooksCollection } from '@/orm/entities/BooksCollection';
import type { UserDTO } from '@/orm/types/entities';
import { passwordEncrypt } from '@/auth/utils/argon2';

@Entity({ tableName: 'users' })
export class User extends BaseEntity
{
	@OneToMany(() => Book, (book) => book.user)
	books = new Collection<Book>(this);

	@OneToMany(() => BooksCollection, (booksCollections) => booksCollections.user)
	booksCollections = new Collection<BooksCollection>(this);

	@Property()
	email: string;

	@Property({ name: 'password' })
	_password: string;

	@Property({ nullable: true })
	avatar: string | null;

	@Property()
	isAdmin: boolean;

	@Property()
	isVerified: boolean;

	constructor(userDTO: UserDTO) {
		super();

		this.email = userDTO.email;
		this.password = userDTO.password;
		this.avatar = null;
		this.isAdmin = false;
		this.isVerified = false;
	}

	public getData() {
		return {
			email: this.email,
			avatar: this.avatar,
			isAdmin: this.isAdmin,
			isVerified: this.isVerified,
		};
	}

	public get password() {
		return this._password;
	}

	public set password(newPassword: string) {
		this._password = passwordEncrypt(newPassword);
	}
}
