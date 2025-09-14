import { Migration } from "@mikro-orm/migrations";

export class Migration20240925211922_initial_tables extends Migration {
	override async up(): Promise<void> {
		this.addSql(`create table "users" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" varchar(255) not null, "password" varchar(255) not null, "avatar" varchar(255) null, "is_admin" boolean not null, "is_verified" boolean not null);`);

		this.addSql(`create table "tokens" ("token" varchar(255) not null, "user_id" int not null, "type" varchar(255) not null, "is_revoked" boolean not null, "created_at" varchar(255) not null, "updated_at" varchar(255) not null, constraint "tokens_pkey" primary key ("token"));`);

		this.addSql(`create table "books_collections" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" int not null, "title" varchar(255) not null, "image" varchar(255) null, "description" varchar(255) not null);`);

		this.addSql(`create table "books" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" int not null, "books_collection_id" int null, "title" varchar(255) not null, "image" varchar(255) null, "description" varchar(255) not null, "pages" int not null, "filename" varchar(255) not null);`);

		this.addSql(`create table "bookmarks" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" int not null, "book_id" int not null, "color" varchar(255) not null default 'FEEFC3', "page" int not null, "comment" varchar(255) not null);`);

		this.addSql(`alter table "tokens" add constraint "tokens_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);

		this.addSql(`alter table "books_collections" add constraint "books_collections_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);

		this.addSql(`alter table "books" add constraint "books_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
		this.addSql(`alter table "books" add constraint "books_books_collection_id_foreign" foreign key ("books_collection_id") references "books_collections" ("id") on update cascade on delete set null;`);

		this.addSql(`alter table "bookmarks" add constraint "bookmarks_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
		this.addSql(`alter table "bookmarks" add constraint "bookmarks_book_id_foreign" foreign key ("book_id") references "books" ("id") on update cascade;`);
	}
}
