import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { UserFactory } from "@/orm/factories/UserFactory";
import { BookFactory } from "@/orm/factories/BookFactory";
import { BooksCollectionFactory } from "@/orm/factories/BooksCollectionFactory";
import { BookmarkFactory } from "@/orm/factories/BookmarkFactory";

export class DatabaseSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		const user_unverified = new UserFactory(em).makeOne();
		const user_verified = new UserFactory(em).makeOne({
			isVerified: true,
		});

		const books_collection = new BooksCollectionFactory(em).makeOne({
			user: user_verified,
		});

		const books_in_collection = new BookFactory(em).each(book => {
			book.user = user_verified;
			book.booksCollection = books_collection;
		}).make(5);

		const books_not_in_collection = new BookFactory(em).each(book => {
			book.user = user_verified;
		}).make(3);

		const bookmark_1 = new BookmarkFactory(em).makeOne({
			user: user_verified,
			book: books_in_collection[0],
		});
		const bookmark_2 = new BookmarkFactory(em).makeOne({
			user: user_verified,
			book: books_not_in_collection[0],
		});

		await em.flush();
	}
}
