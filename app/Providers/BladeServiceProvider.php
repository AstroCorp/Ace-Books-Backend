<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Blade;

class BladeServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        Blade::if('rank_more_or_equal', function ($rank_id) {
            return Auth::user()->rank_id >= $rank_id;
        });

        Blade::if('rank_less_or_equal', function ($rank_id) {
            return Auth::user()->rank_id <= $rank_id;
        });
    }
}
