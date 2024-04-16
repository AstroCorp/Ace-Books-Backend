import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { UserFactory } from "@/orm/factories/UserFactory";

export class DatabaseSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		const users = new UserFactory(em).make(5);
	}
}
