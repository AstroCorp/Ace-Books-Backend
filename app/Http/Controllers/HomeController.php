<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('verified'); // E-Mail verificado
    }

    public function index()
    {
        return view('home');
    }

    // Buscador de la biblioteca del usuario
    public function library(Request $request)
    {
        $user = Auth::user();

        $collections = $user->collections()->where('name', 'LIKE', '%' . $request->input('search') . '%')->get();
        $books = $user->booksWithoutCollection()->where('name', 'LIKE', '%' . $request->input('search') . '%')->get();

        return response()->json([
            'collections' => $collections,
            'books' => $books
        ]);
    }
}
