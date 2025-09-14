import { Factory } from "@mikro-orm/seeder";
import { faker } from "@faker-js/faker";
import { User } from "@/infrastructure/orm/entities/User";
import HashService from "@/infrastructure/auth/services/hash.service";

export class UserFactory extends Factory<User> {
	model = User;

	definition(): Partial<User> {
		const hashService = new HashService();

		return {
			email: faker.internet.email(),
			password: hashService.generate('password'),
			avatar: faker.image.avatar(),
			isAdmin: false,
			isVerified: false,
		};
	}
}
