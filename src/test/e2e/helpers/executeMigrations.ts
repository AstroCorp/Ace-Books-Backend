import { MikroORM } from "@mikro-orm/postgresql";
import { DatabaseSeeder } from "@/infrastructure/orm/seeders/DatabaseSeeder";
import config from "@/infrastructure/orm/mikro-orm.config";

export const executeMigrations = async () => {
	const orm = await MikroORM.init({
		...config,
		logger: () => null, // Desactiva los logs de MikroORM
	});
	await orm.schema.drop({
		dropMigrationsTable: true,
		dropDb: false,
	});
	await orm.migrator.up();
	await orm.seeder.seed(DatabaseSeeder);

	return orm;
}
