<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;

class ExampleTest extends DuskTestCase
{
    /**
     * A basic browser test example.
     *
     * @return void
     */
    public function testBasicExample()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/') // Va a la dirección dada
                    ->click('@link_login') // Busca un elemento con el atributo dusk='link_login'
                    ->assertTitle('AceBooks') // Comprueba el título de la web
                    ->assertUrlIs(config('app.url').'/login'); // Comprueba el link actual
        });
    }
}
