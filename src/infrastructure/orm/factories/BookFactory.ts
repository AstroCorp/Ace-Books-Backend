import { Factory } from "@mikro-orm/seeder";
import { faker } from "@faker-js/faker";
import type { EntityData } from "@mikro-orm/core";
import { Book } from "@/infrastructure/orm/entities/Book";
import { FileCollection } from "@/infrastructure/orm/entities/mixins/HasFiles";
import { copyFixtureToStorage } from "@/infrastructure/orm/factories/helpers/copyFixtureToStorage";

export class BookFactory extends Factory<Book> {
	model = Book;

	definition(): Partial<Book> {
		return {
			title: faker.commerce.productName(),
			description: faker.lorem.paragraph(),
			pages: 200,
		};
	}

	makeEntity(input?: EntityData<Book>, index?: number): Book {
		const book = super.makeEntity(input, index);

		book.addFile({
			collection: FileCollection.Image,
			...copyFixtureToStorage("example.jpg"),
		});

		book.addFile({
			collection: FileCollection.File,
			...copyFixtureToStorage("example.pdf"),
		});

		return book;
	}
}
