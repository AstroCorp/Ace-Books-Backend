import { Entity, Property, ManyToOne, Rel, rel } from '@mikro-orm/core';
import { BaseEntity } from '@/orm/entities/BaseEntity';
import { User } from '@/orm/entities/User';
import { Book } from '@/orm/entities/Book';
import type { BookmarkDTO } from '@/orm/types/entities';

@Entity()
export class Bookmark extends BaseEntity
{
	@ManyToOne(() => User)
	user: Rel<User>;

	@ManyToOne(() => Book)
	book: Rel<Book>;

	@Property({ default: 'FEEFC3' })
	color: string;

	@Property()
	page: number;

	@Property()
	comment: string;

	constructor(bookmarkDTO: BookmarkDTO) {
		super();

		this.user = rel(User, bookmarkDTO.user);
		this.book = rel(Book, bookmarkDTO.book);
		this.color = bookmarkDTO.color;
		this.page = bookmarkDTO.page;
		this.comment = bookmarkDTO.comment;
	}
}
