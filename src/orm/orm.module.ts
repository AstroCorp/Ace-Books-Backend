import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User, Book, BooksCollection, Bookmark, RefreshToken } from './entities';
import config from './mikro-orm.config';

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
			],
		}),
	],
	exports: [MikroOrmModule],
})
export class OrmModule {}
