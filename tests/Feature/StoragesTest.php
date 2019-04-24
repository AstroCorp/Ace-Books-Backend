<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Storage;
use App\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;

class StorageTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function totalStorages()
    {
        $total_storages = Storage::all()->count();
        // dd($storages);

        // Comprobamos que existen solo las creadas por las semillas
        $this->assertEquals(2, $total_storages);
    }

    /** @test */
    public function checkFactory()
    {
        $collection = factory(Collection::class)->create();

        // Comprobamos que lo que hemos creado existe
        $this->assertDatabaseHas('collections', [
            'id' => $collection->id
        ]);
    }
}
