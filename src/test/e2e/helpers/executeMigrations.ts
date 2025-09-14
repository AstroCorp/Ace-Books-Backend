import { MikroORM } from "@mikro-orm/core";
import { DatabaseSeeder } from "@/infrastructure/orm/seeders/DatabaseSeeder";
import config from "@/infrastructure/orm/mikro-orm.config";

export const executeMigrations = async () => {
	const orm = await MikroORM.init({
		...config,
		logger: () => null, // Desactiva los logs de MikroORM
	});
	await orm.getSchemaGenerator().dropSchema({
		dropMigrationsTable: true,
		dropDb: false,
	});
	await orm.getMigrator().up();
	await orm.seeder.seed(DatabaseSeeder);

	return orm;
}
