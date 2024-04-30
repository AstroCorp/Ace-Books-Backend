import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { BooksCollection } from '@/orm/entities/BooksCollection';

export class BooksCollectionFactory extends Factory<BooksCollection> {
	model = BooksCollection;

	definition(): Partial<BooksCollection> {
		return {
			title: faker.lorem.words(3),
			image: faker.image.urlLoremFlickr({
				width: 620,
				height: 877,
			}),
			description: faker.lorem.paragraph(),
		};
	}
}
