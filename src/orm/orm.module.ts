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
		MikroOrmModule.forRoot(config),
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
