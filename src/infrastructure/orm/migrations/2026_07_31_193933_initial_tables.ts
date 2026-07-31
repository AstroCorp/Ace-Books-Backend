import { Migration } from '@mikro-orm/migrations';

export class Migration20260731193933_initial_tables extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`create table "users" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" varchar(255) not null, "password" varchar(255) not null, "avatar" varchar(255) null, "is_admin" boolean not null, "is_verified" boolean not null);`);

    this.addSql(`create table "tokens" ("token" varchar(255) not null, "user_id" int not null, "type" varchar(255) not null, "is_revoked" boolean not null, "created_at" varchar(255) not null, "updated_at" varchar(255) not null, primary key ("token"));`);

    this.addSql(`create table "books_collections" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" int not null, "title" varchar(255) not null, "description" varchar(255) not null);`);

    this.addSql(`create table "books" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" int not null, "books_collection_id" int null, "title" varchar(255) not null, "description" varchar(255) not null, "pages" int not null);`);

    this.addSql(`create table "files" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "model_type" varchar(255) not null, "model_id" int not null, "collection" varchar(255) not null, "filename" varchar(255) not null, "disk" varchar(255) not null, "size" int not null);`);
    this.addSql(`create index "files_model_type_model_id_index" on "files" ("model_type", "model_id");`);

    this.addSql(`create table "bookmarks" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" int not null, "book_id" int not null, "color" varchar(255) not null default 'FEEFC3', "page" int not null, "comment" varchar(255) not null);`);

    this.addSql(`alter table "tokens" add constraint "tokens_user_id_foreign" foreign key ("user_id") references "users" ("id");`);

    this.addSql(`alter table "books_collections" add constraint "books_collections_user_id_foreign" foreign key ("user_id") references "users" ("id");`);

    this.addSql(`alter table "books" add constraint "books_user_id_foreign" foreign key ("user_id") references "users" ("id");`);
    this.addSql(`alter table "books" add constraint "books_books_collection_id_foreign" foreign key ("books_collection_id") references "books_collections" ("id") on delete set null;`);

    this.addSql(`alter table "bookmarks" add constraint "bookmarks_user_id_foreign" foreign key ("user_id") references "users" ("id");`);
    this.addSql(`alter table "bookmarks" add constraint "bookmarks_book_id_foreign" foreign key ("book_id") references "books" ("id");`);
  }

}
