import { Entity, Property, Collection, OneToMany } from '@mikro-orm/core';
import { BaseEntity } from '@/infrastructure/orm/entities/BaseEntity';
import { Book } from '@/infrastructure/orm/entities/Book';
import { BooksCollection } from '@/infrastructure/orm/entities/BooksCollection';
import type { UserDTO } from '@/infrastructure/orm/types/entities';
import { User as UserModel } from '@/domain/models/User';

@Entity({ tableName: 'users' })
export class User extends BaseEntity
{
	@OneToMany(() => Book, (book) => book.user)
	books = new Collection<Book>(this);

	@OneToMany(() => BooksCollection, (booksCollections) => booksCollections.user)
	booksCollections = new Collection<BooksCollection>(this);

	@Property()
	email: string;

	@Property()
	password: string;

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

	public toDomainModel(): UserModel {
		return new UserModel({
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			email: this.email,
			password: this.password,
			avatar: this.avatar,
			isAdmin: this.isAdmin,
			isVerified: this.isVerified,
		});
	}
}
