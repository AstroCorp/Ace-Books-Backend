import { Migration } from "@mikro-orm/migrations";

export class Migration20240417192637_initial_tables extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'create table "user" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" varchar(255) not null, "password" varchar(255) not null, "avatar" varchar(255) not null, "is_admin" boolean not null, "is_verified" boolean not null);'
		);

		this.addSql(
			'create table "books_collection" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" int not null, "title" varchar(255) not null, "image" varchar(255) null, "description" varchar(255) not null);'
		);

		this.addSql(
			'create table "book" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" int not null, "books_collection_id" int null, "title" varchar(255) not null, "image" varchar(255) null, "description" varchar(255) not null, "pages" int not null, "filename" varchar(255) not null);'
		);

		this.addSql(
			'create table "bookmark" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" int not null, "book_id" int not null, "color" varchar(255) not null default \'FEEFC3\', "page" int not null, "comment" varchar(255) not null);'
		);

		this.addSql(
			'alter table "books_collection" add constraint "books_collection_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;'
		);

		this.addSql(
			'alter table "book" add constraint "book_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;'
		);
		this.addSql(
			'alter table "book" add constraint "book_books_collection_id_foreign" foreign key ("books_collection_id") references "books_collection" ("id") on update cascade on delete set null;'
		);

		this.addSql(
			'alter table "bookmark" add constraint "bookmark_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;'
		);
		this.addSql(
			'alter table "bookmark" add constraint "bookmark_book_id_foreign" foreign key ("book_id") references "book" ("id") on update cascade;'
		);
	}
}
