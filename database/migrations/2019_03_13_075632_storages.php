<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Storages extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('storages', function (Blueprint $table)
        {
            $table->increments('id');
            $table->string('name');
            $table->integer('amount')->unsigned();
            $table->integer('size')->unsigned();
            $table->boolean('share')->default(false);
            $table->double('price', 6, 2)->unsigned();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //Schema::dropIfExists('storages');
    }
}
