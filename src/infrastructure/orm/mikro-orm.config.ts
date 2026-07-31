import { Logger } from "@nestjs/common";
import { defineConfig } from "@mikro-orm/postgresql";
import { ReflectMetadataProvider } from "@mikro-orm/decorators/legacy";
import { Migrator } from "@mikro-orm/migrations";
import { SeedManager } from "@mikro-orm/seeder";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { User } from "@/infrastructure/orm/entities/User";
import { Token } from "@/infrastructure/orm/entities/Token";
import { Book } from "@/infrastructure/orm/entities/Book";
import { BooksCollection } from "@/infrastructure/orm/entities/BooksCollection";
import { Bookmark } from "@/infrastructure/orm/entities/Bookmark";
import { File } from "@/infrastructure/orm/entities/File";

const logger = new Logger('MikroORM');
const config = defineConfig({
	metadataProvider: ReflectMetadataProvider,
	entities: [
		User,
		Token,
		Book,
		BooksCollection,
		Bookmark,
		File,
	],
	migrations: {
		path: 'dist/infrastructure/orm/migrations',
		pathTs: 'src/infrastructure/orm/migrations',
		tableName: 'migrations',
		transactional: true,
		allOrNothing: true,
		snapshot: false,
		disableForeignKeys: false,
		fileName: (timestamp: string, name?: string) => {
			if (!name) {
				throw new Error('Specify migration name via `mikro-orm migration:create --name=...`');
			}

			const regex = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/;
			const [, year, month, day, hour, minute, second] = timestamp.match(regex);
			const formattedTimestamp = `${year}_${month}_${day}_${hour}${minute}${second}`;

			return `${formattedTimestamp}_${name}`;
		},
	},
	seeder: {
		path: 'dist/infrastructure/orm/seeders',
		pathTs: 'src/infrastructure/orm/seeders',
		fileName: (className: string) => className,
	},
	highlighter: new SqlHighlighter(),
	logger: logger.log.bind(logger),
	clientUrl: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
	extensions: [
		Migrator,
		SeedManager,
	],
});

export default config;
