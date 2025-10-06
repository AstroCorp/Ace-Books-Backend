import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { UserFactory } from "@/infrastructure/orm/factories/UserFactory";
import { BookFactory } from "@/infrastructure/orm/factories/BookFactory";
import { BooksCollectionFactory } from "@/infrastructure/orm/factories/BooksCollectionFactory";
import { BookmarkFactory } from "@/infrastructure/orm/factories/BookmarkFactory";

export class DatabaseSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		const user_dev = new UserFactory(em).makeOne({
			email: 'dev@example.com',
		});
		const user_unverified_1 = new UserFactory(em).makeOne({
			email: 'unverified1@example.com',
		});
		const user_unverified_2 = new UserFactory(em).makeOne({
			email: 'unverified2@example.com',
		});
		const user_verified_1 = new UserFactory(em).makeOne({
			email: 'verified1@example.com',
			isVerified: true,
		});
		const user_verified_2 = new UserFactory(em).makeOne({
			email: 'verified2@example.com',
			isVerified: true,
		});

		const books_collection = new BooksCollectionFactory(em).makeOne({
			user: user_verified_1,
		});

		const books_in_collection = new BookFactory(em).each(book => {
			book.user = user_verified_1;
			book.booksCollection = books_collection;
		}).make(5);
		const books_not_in_collection = new BookFactory(em).each(book => {
			book.user = user_verified_1;
		}).make(3);

		const bookmark_1 = new BookmarkFactory(em).makeOne({
			user: user_verified_1,
			book: books_in_collection[0],
		});
		const bookmark_2 = new BookmarkFactory(em).makeOne({
			user: user_verified_1,
			book: books_not_in_collection[0],
		});

		await em.flush();
	}
}
