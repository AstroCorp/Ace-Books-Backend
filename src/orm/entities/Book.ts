import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { User } from './User';
import { BooksCollection } from './BooksCollection';

@Entity()
export class Book extends BaseEntity {
	@ManyToOne('User')
	user: User;

	@ManyToOne('BooksCollection')
	collection!: BooksCollection;

	@Property()
	name: string;

	@Property({ nullable: true })
	image: string;

	@Property()
	description: string;

	@Property()
	filename: string;

	constructor(user: User, name: string, image: string, description: string, filename: string) {
		super();

		this.user = user;
		this.name = name;
		this.image = image;
		this.description = description;
		this.filename = filename;
	}
}
