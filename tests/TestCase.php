<?php

// Para ejecutar phpunit -> ./vendor/bin/phpunit

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;
}
