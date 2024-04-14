import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '@/orm/entities/BaseEntity';
import { BooksCollection } from '@/orm/entities/BooksCollection';
import { User } from '@/orm/entities/User';


@Entity()
export class Book extends BaseEntity
{
	@ManyToOne(() => User)
	user: User;

	@ManyToOne({ entity: () => BooksCollection, nullable: true })
	collection!: BooksCollection;

	@Property()
	name: string;

	@Property({ nullable: true })
	image!: string;

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
