import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { Book } from '@/orm/entities/Book';

export class BookFactory extends Factory<Book> {
	model = Book;

	definition(): Partial<Book> {
		return {
			title: faker.commerce.productName(),
			image: faker.image.urlLoremFlickr({
				width: 620,
				height: 877,
			}),
			description: faker.lorem.paragraph(),
			pages: 200,
			filename: 'example.pdf',
		};
	}
}
