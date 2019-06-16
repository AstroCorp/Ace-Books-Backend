<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Storage;
use App\Rules\CheckValidStorage;
use Illuminate\Support\Facades\Auth;

class StorageController extends Controller
{
    public function index()
    {
        $storages = Storage::all();

        return view('storage', compact('storages'));
    }

    public function buy(Request $request)
    {
        $request->validate([
            'buy' => ['required', new CheckValidStorage],
        ]);

        $user = Auth::user();
        $user->storage_id = $request->input('buy');
        $user->save();

        return redirect()->route('storage')->with('status', true);
    }
}
