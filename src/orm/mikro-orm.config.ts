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
	clientUrl: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
});

export default config;
