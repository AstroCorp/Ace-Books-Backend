import { Entity, Property, Collection, OneToMany } from '@mikro-orm/core';
import { BaseEntity } from '@/infrastructure/orm/entities/BaseEntity';
import { Book } from '@/infrastructure/orm/entities/Book';
import { BooksCollection } from '@/infrastructure/orm/entities/BooksCollection';
import type { UserDTO } from '@/infrastructure/orm/types/entities';
import Hash from '@/infrastructure/auth/utils/hash';

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

	public getDataForToken() {
		return {
			userId: this.id,
			isAdmin: this.isAdmin,
			isVerified: this.isVerified,
		};
	}

	public getDataForProfile() {
		return {
			email: this.email,
			avatar: this.avatar,
		};
	}

	public get password() {
		return this._password;
	}

	public set password(newPassword: string) {
		this._password = new Hash().generate(newPassword);
	}
}
