import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import config from "@/infrastructure/orm/mikro-orm.config";
import { User } from "@/infrastructure/orm/entities/User";
import { Token } from "@/infrastructure/orm/entities/Token";
import { Book } from "@/infrastructure/orm/entities/Book";
import { BooksCollection } from "@/infrastructure/orm/entities/BooksCollection";
import { Bookmark } from "@/infrastructure/orm/entities/Bookmark";

@Module({
	imports: [
		MikroOrmModule.forRoot({
			...config,
			debug: [NodeJS.Environment.Development, NodeJS.Environment.Testing].includes(process.env.NODE_ENV),
			driverOptions: {
				connection: {
					ssl: process.env.NODE_ENV === NodeJS.Environment.Production,
				},
			},
		}),
		MikroOrmModule.forFeature({
			entities: [
				User,
				Token,
				Book,
				BooksCollection,
				Bookmark,
			],
		}),
	],
	exports: [MikroOrmModule],
})
export class OrmModule {}
