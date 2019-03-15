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
        $newStorage1->amount = 10;
        $newStorage1->size = 5;
        $newStorage1->share = false;
        $newStorage1->price = 0;
        $newStorage1->save();

        $newStorage2 = new Storage();
        $newStorage2->name = 'storage2';
        $newStorage2->amount = 20;
        $newStorage2->size = 5;
        $newStorage2->share = true;
        $newStorage2->price = 0;
        $newStorage2->save();
    }
}
