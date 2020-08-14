import { Module } from "@nestjs/common";
import { MikroOrmModule } from "nestjs-mikro-orm";

import { User, Book, Collection, Bookmark, Lang } from "../entities";
import config from "../mikro-orm.config";

@Module({
	imports: [
		MikroOrmModule.forRoot(config),
		MikroOrmModule.forFeature({
			entities: [
				User,
				Book,
				Collection,
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
