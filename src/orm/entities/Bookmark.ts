import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '@/orm/entities/BaseEntity';
import { User } from '@/orm/entities/User';
import { Book } from '@/orm/entities/Book';

@Entity()
export class Bookmark extends BaseEntity
{
	@ManyToOne(() => User)
	user: User;

	@ManyToOne(() => Book)
	book: Book;

	@Property({ default: 'FEEFC3' })
	color: string;

	@Property()
	page: number;

	@Property()
	comment: string;

	constructor(user: User, book: Book, color: string, page: number, comment: string) {
		super();

		this.user = user;
		this.book = book;
		this.color = color;
		this.page = page;
		this.comment = comment;
	}
}
