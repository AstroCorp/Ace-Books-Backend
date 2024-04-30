import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { Bookmark } from '@/orm/entities/Bookmark';

export class BookmarkFactory extends Factory<Bookmark> {
	model = Bookmark;

	definition(): Partial<Bookmark> {
		return {
			color: faker.internet.color().replace('#', ''),
			page: faker.number.int({
				min: 1,
				max: 200,
			}),
			comment: faker.lorem.paragraph(),
		};
	}
}
