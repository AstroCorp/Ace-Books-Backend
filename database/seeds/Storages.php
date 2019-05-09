<?php

use Illuminate\Database\Seeder;
use App\Storage;

class Storages extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $newStorage1 = new Storage();
        $newStorage1->name = 'storages.storage1';
        $newStorage1->amount_books = 10;
        $newStorage1->size_books = 5;
        $newStorage1->share_books = false;
        $newStorage1->amount_collections = 2;
        $newStorage1->share_collections = true;
        $newStorage1->price = 0;
        $newStorage1->save();

        $newStorage2 = new Storage();
        $newStorage2->name = 'storages.storage2';
        $newStorage2->amount_books = 20;
        $newStorage2->size_books = 5;
        $newStorage2->share_books = true;
        $newStorage2->amount_collections = 10;
        $newStorage2->share_collections = true;
        $newStorage2->price = 0;
        $newStorage2->save();
    }
}
