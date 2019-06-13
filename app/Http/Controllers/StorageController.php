<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Storage;

class StorageController extends Controller
{
    public function index()
    {
        $storages = Storage::all();

        return view('storage', compact('storages'));
    }

    public function buy(Request $request)
    {
        dd($request);
    }
}
