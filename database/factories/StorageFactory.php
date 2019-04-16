<?php

use Illuminate\Support\Str;
use Faker\Generator as Faker;
use App\Storage;

$factory->define(Storage::class, function (Faker $faker) {
    return [
        'name' => Str::random(10),
        'amount_documents' => $faker->randomNumber(),
        'size_documents' => 5,
        'share_documents' => $faker->boolean(),
        'amount_collections' => 5,
        'share_collections' => $faker->boolean(),
        'price' => 1.0
    ];
});
