import { Logger } from "@nestjs/common";
import { Options } from "mikro-orm";
import { User, BaseEntity, Book, BooksCollection, Bookmark, Lang, RefreshToken } from "./entities";

const logger = new Logger("MikroORM");
const config = {
	entities: [
		User,
		RefreshToken,
		Book,
		BooksCollection,
		Bookmark,
		Lang,
		BaseEntity,
	],
	entitiesDirsTs: ["src/orm/entities"],
	dbName: "db.sqlite3",
	type: "sqlite",
	debug: true,
	logger: logger.log.bind(logger),
} as Options;

export default config;
