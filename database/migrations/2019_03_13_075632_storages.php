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
            $table->integer('amount_documents')->unsigned();
            $table->integer('size_documents')->unsigned();
            $table->boolean('share_documents')->default(false);
            $table->integer('amount_collections')->unsigned();
            $table->boolean('share_collections')->default(false);
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
