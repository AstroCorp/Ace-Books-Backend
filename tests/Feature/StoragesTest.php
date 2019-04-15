<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Storage;

class StorageTest extends TestCase
{
    /** @test */
    public function totalStorages()
    {
        $total_storages = Storage::all()->count();
        // dd($storages);

        $this->assertEquals(2, $total_storages);
    }
}
