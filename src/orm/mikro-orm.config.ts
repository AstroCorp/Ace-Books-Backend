import { Logger } from '@nestjs/common';
import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { BaseEntity } from '@/orm/entities/BaseEntity';
import { User } from '@/orm/entities/User';
import { Book } from '@/orm/entities/Book';
import { BooksCollection } from '@/orm/entities/BooksCollection';
import { Bookmark } from '@/orm/entities/Bookmark';

const logger = new Logger('MikroORM');
const config = defineConfig({
	entities: [
		BaseEntity,
		User,
		Book,
		BooksCollection,
		Bookmark,
	],
	migrations: {
		path: 'dist/orm/migrations',
		pathTs: 'src/orm/migrations',
		tableName: 'migrations',
		transactional: true,
		allOrNothing: true,
		snapshot: false,
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
		path: 'dist/orm/seeders',
		pathTs: 'src/orm/seeders',
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
