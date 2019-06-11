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
        for($i = 1; $i <= 1; $i++)
        {
            $collection = new Collection();
            $collection->user_id = 2;
            $collection->name = 'Collection '.$i;
            $collection->save();
        }

        $book1 = new Book();
        $book1->user_id = 2;
        $book1->name = 'Book 1';
        $book1->filename = 'example1.pdf';
        $book1->save();

        $book2 = new Book();
        $book2->user_id = 2;
        $book2->collection_id = 1;
        $book2->name = 'Book 2';
        $book2->filename = 'example2.pdf';
        $book2->save();

        $user = auth()->loginUsingId(2);
        $user->n_books = 2;
        $user->n_collections = 1;
        $user->save();
    }
}
