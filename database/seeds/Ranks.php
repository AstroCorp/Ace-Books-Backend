<?php

use Illuminate\Database\Seeder;
use App\Rank;

class Ranks extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $newRank1 = new Rank();
        $newRank1->name = 'rank1.name';
        $newRank1->save();

        $newRank2 = new Rank();
        $newRank2->name = 'rank2.name';
        $newRank2->save();
    }
}
