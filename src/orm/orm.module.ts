import { Module } from "@nestjs/common";
import { MikroOrmModule } from "nestjs-mikro-orm";

import { User, Book, BooksCollection, Bookmark, Lang, RefreshToken } from "../orm/entities";
import config from "./mikro-orm.config";

@Module({
	imports: [
		MikroOrmModule.forRoot(config),
		MikroOrmModule.forFeature({
			entities: [
				User,
				RefreshToken,
				Book,
				BooksCollection,
				Bookmark,
				Lang,
			],
		}),
	],
	exports: [
		MikroOrmModule,
	],
})
export class OrmModule {}
