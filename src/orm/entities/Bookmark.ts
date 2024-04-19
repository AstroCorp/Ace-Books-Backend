import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '@/orm/entities/BaseEntity';
import { User } from '@/orm/entities/User';
import { Book } from '@/orm/entities/Book';
import { BookmarkDTO } from '@/orm/types/entities';

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

	constructor(bookmarkDTO: BookmarkDTO) {
		super();

		this.user = bookmarkDTO.user;
		this.book = bookmarkDTO.book;
		this.color = bookmarkDTO.color;
		this.page = bookmarkDTO.page;
		this.comment = bookmarkDTO.comment;
	}
}
