import { Factory } from "@mikro-orm/seeder";
import { faker } from "@faker-js/faker";
import type { EntityData } from "@mikro-orm/core";
import { BooksCollection } from "@/infrastructure/orm/entities/BooksCollection";
import { FileCollection } from "@/infrastructure/orm/entities/mixins/HasFiles";
import { copyFixtureToStorage } from "@/infrastructure/orm/factories/helpers/copyFixtureToStorage";

export class BooksCollectionFactory extends Factory<BooksCollection> {
	model = BooksCollection;

	definition(): Partial<BooksCollection> {
		return {
			title: faker.lorem.words(3),
			description: faker.lorem.paragraph(),
		};
	}

	makeEntity(input?: EntityData<BooksCollection>, index?: number): BooksCollection {
		const booksCollection = super.makeEntity(input, index);

		booksCollection.addFile({
			collection: FileCollection.Image,
			...copyFixtureToStorage("example.jpg"),
		});

		return booksCollection;
	}
}
