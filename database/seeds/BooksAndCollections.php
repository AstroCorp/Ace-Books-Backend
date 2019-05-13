<?php

use Illuminate\Database\Seeder;
use App\Book;
use App\Collection;

class BooksAndCollections extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $collection1 = new Collection();
        $collection1->user_id = 2;
        $collection1->name = 'Collection 1';
        $collection1->save();

        $collection2 = new Collection();
        $collection2->user_id = 2;
        $collection2->name = 'Collection 2';
        $collection2->save();

        $book1 = new Book();
        $book1->user_id = 2;
        $book1->name = 'Book 1';
        $book1->filename = 'example.pdf';
        $book1->save();

        $book2 = new Book();
        $book2->user_id = 2;
        $book2->collection_id = 1;
        $book2->name = 'Book 2';
        $book2->filename = 'example.pdf';
        $book2->save();

        $user = auth()->loginUsingId(2);
        $user->n_books = 2;
        $user->n_collections = 2;
        $user->save();
    }
}
