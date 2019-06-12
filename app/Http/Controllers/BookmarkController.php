<?php

namespace App\Http\Controllers;

use App\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookmarkController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('verified'); // E-Mail verificado
    }

    // Devuelve todos los bookmarks
    public function index(Request $request)
    {
        $bookID = $request->input('book');
        $bookmarks = Book::find($bookID)->bookmarks()->get();

        return response()->json([
            'bookmarks' => $bookmarks
        ]);
    }

    public function add(Request $request)
    {

    }

    public function update(Request $request)
    {

    }

    public function delete(Request $request)
    {
        $status = false;

        $bookID = $request->input('book');
        $bookmarkID = $request->input('bookmark');
        $bookmarks = Book::find($bookID)->bookmarks()->get();

        if($bookmarks->contains($bookmarkID))
        {
            if($bookmarks->find($bookmarkID)->delete())
            {
                $status = true;
            }
        }

        return response()->json([
            'status' => $status
        ]);
    }
}
