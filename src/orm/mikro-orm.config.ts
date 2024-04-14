import { Logger } from '@nestjs/common';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { BaseEntity } from '@/orm/entities/BaseEntity';
import { User } from '@/orm/entities/User';
import { Book } from '@/orm/entities/Book';
import { BooksCollection } from '@/orm/entities/BooksCollection';
import { Bookmark } from '@/orm/entities/Bookmark';
import { defineConfig } from '@mikro-orm/postgresql';

const logger = new Logger('MikroORM');
const config = defineConfig({
	entities: [
		BaseEntity,
		User,
		Book,
		BooksCollection,
		Bookmark,
	],
	highlighter: new SqlHighlighter(),
	logger: logger.log.bind(logger),
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	dbName: process.env.DATABASE_NAME,
	port: 5432,
});

export default config;
