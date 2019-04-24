<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('verified'); // E-Mail verificado
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    // Buscador de la biblioteca del usuario
    public function library(Request $request)
    {
        $this->validate($request,
        [
            'search' => 'required|min:5'
        ]);

        $user = Auth::user();

        $collections = $user->collections()->where('name', 'like', '%' . $request->input('search') . '%')->get();
        $books = $user->booksWithoutCollection()->where('name', 'like', '%' . $request->input('search') . '%')->get();

        return response([$collections, $books]);
    }
}
