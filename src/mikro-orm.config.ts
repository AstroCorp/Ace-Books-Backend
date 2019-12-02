import { Logger } from "@nestjs/common";
import { Options } from "mikro-orm";
import { User, BaseEntity, Book, Collection, Bookmark } from "./entities";

const logger = new Logger("MikroORM");
const config = {
	entities: [User, Book, Collection, Bookmark, BaseEntity],
	entitiesDirsTs: ["src/entities"],
	dbName: "db.sqlite",
	type: "sqlite",
	debug: true,
	logger: logger.log.bind(logger),
} as Options;

export default config;
