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
        $newStorage1->name = 'storage.package1';
        $newStorage1->amount_books = 10;
        $newStorage1->size_books = 5000;
        $newStorage1->share_books = true;
        $newStorage1->amount_collections = 5;
        $newStorage1->share_collections = false;
        $newStorage1->price = 0;
        $newStorage1->save();

        $newStorage2 = new Storage();
        $newStorage2->name = 'storage.package2';
        $newStorage2->amount_books = 50;
        $newStorage2->size_books = 10000;
        $newStorage2->share_books = true;
        $newStorage2->amount_collections = 15;
        $newStorage2->share_collections = true;
        $newStorage2->price = 4.95;
        $newStorage2->save();
    }
}
