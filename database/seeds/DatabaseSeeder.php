<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(Langs::class);
        $this->call(Ranks::class);
        $this->call(Storages::class);

        Model::reguard();
    }
}
