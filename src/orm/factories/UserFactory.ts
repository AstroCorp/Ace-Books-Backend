import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { User } from '@/orm/entities/User';

export class UserFactory extends Factory<User> {
	model = User;

	definition(): Partial<User> {
		return {
			email: faker.internet.email(),
			password: faker.internet.password(),
			avatar: faker.image.avatar(),
			isAdmin: false,
			isVerified: false,
		};
	}
}
