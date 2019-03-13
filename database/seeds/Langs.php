<?php

use Illuminate\Database\Seeder;
use App\Lang;

class Langs extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $newLang1 = new Lang();
        $newLang1->name = 'lang1.name';
        $newLang1->initial = 'en';
        $newLang1->save();

        $newLang2 = new Lang();
        $newLang2->name = 'lang2.name';
        $newLang2->initial = 'es';
        $newLang2->save();
    }
}
