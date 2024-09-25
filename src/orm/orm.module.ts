import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '@/orm/mikro-orm.config';
import { User } from '@/orm/entities/User';
import { Token } from '@/orm/entities/Token';
import { Book } from '@/orm/entities/Book';
import { BooksCollection } from '@/orm/entities/BooksCollection';
import { Bookmark } from '@/orm/entities/Bookmark';

@Module({
	imports: [
		MikroOrmModule.forRoot({
			...config,
			debug: process.env.NODE_ENV === NodeJS.Environment.Development,
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
