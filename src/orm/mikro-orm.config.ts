import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { User, BaseEntity, Book, BooksCollection, Bookmark, Lang, RefreshToken } from './entities';

const logger = new Logger('MikroORM');
const config = {
	entities: [
		BaseEntity,
		Lang,
		User,
		RefreshToken,
		Book,
		BooksCollection,
		Bookmark,
	],
	highlighter: new SqlHighlighter(),
	logger: logger.log.bind(logger),
	multipleStatements: process.env.MIKRO_ORM_MULTIPLE_STATEMENTS || false,
} as Options;

export default config;
