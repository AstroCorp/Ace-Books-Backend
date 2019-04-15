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
            $newStorage1->name = 'storage1';
            $newStorage1->amount_documents = 10;
            $newStorage1->size_documents = 5;
            $newStorage1->share_documents = false;
            $newStorage1->amount_collections = 5;
            $newStorage1->share_collections = true;
            $newStorage1->price = 0;
        $newStorage1->save();

        $newStorage2 = new Storage();
            $newStorage2->name = 'storage2';
            $newStorage2->amount_documents = 20;
            $newStorage2->size_documents = 5;
            $newStorage2->share_documents = true;
            $newStorage2->amount_collections = 10;
            $newStorage2->share_collections = true;
            $newStorage2->price = 0;
        $newStorage2->save();
    }
}
