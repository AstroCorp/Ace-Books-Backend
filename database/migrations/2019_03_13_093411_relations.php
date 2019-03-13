<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Relations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('books', function (Blueprint $table)
        {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('collection_id')->references('id')->on('collections')->onDelete('cascade');
        });

        Schema::table('bookmarks', function (Blueprint $table)
        {
            $table->foreign('book_id')->references('id')->on('books')->onDelete('cascade');
        });

        Schema::table('collections', function (Blueprint $table)
        {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::table('users', function (Blueprint $table)
        {
            $table->foreign('storage_id')->references('id')->on('storages')->onDelete('cascade');
            $table->foreign('rank_id')->references('id')->on('ranks')->onDelete('cascade');
            $table->foreign('lang_id')->references('id')->on('langs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();

        Schema::dropIfExists('users');
        Schema::dropIfExists('password_resets');
        Schema::dropIfExists('bookmarks');
        Schema::dropIfExists('books');
        Schema::dropIfExists('storages');
        Schema::dropIfExists('collections');
        Schema::dropIfExists('langs');
        Schema::dropIfExists('ranks');
        Schema::dropIfExists('migrates');

        Schema::enableForeignKeyConstraints();
    }
}
