<?php

use App\User;
use Illuminate\Support\Str;
use Faker\Generator as Faker;
use App\Collection;

$factory->define(Collection::class, function (Faker $faker) {
    return [
        'user_id' => factory(User::class)->create()->id,
        'name' => $faker->sentence,
        'image' => $faker->imageUrl,
        'description' => $faker->sentence
    ];
});
