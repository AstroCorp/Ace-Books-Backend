<?php

namespace App\Http\Controllers;

use App\Book;
use App\Bookmark;
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
        $bookmarks = [];

        if(Auth::user()->books->contains($bookID))
        {
            $bookmarks = Book::find($bookID)->bookmarks()->get();
        }

        return response()->json([
            'bookmarks' => $bookmarks
        ]);
    }

    public function add(Request $request)
    {
        $status = false;
        $bookID = $request->input('book');

        if(Auth::user()->books->contains($bookID))
        {
            $bookmark = new Bookmark();
            $bookmark->book_id = $request->input('book');
            $bookmark->page = $request->input('page');
            $bookmark->comment = $request->input('comment');
            $bookmark->save();

            $status = true;
        }

        return response()->json([
            'status' => $status
        ]);
    }

    public function update(Request $request)
    {
        $status = false;

        $bookID = $request->input('book');
        $bookmarkID = $request->input('bookmark');
        $bookmarks = Book::find($bookID)->bookmarks()->get();

        if(Auth::user()->books->contains($bookID) && $bookmarks->contains($bookmarkID))
        {
            $bookmark = $bookmarks->find($bookmarkID);

            if($bookmark)
            {
                $bookmark->comment = $request->input('comment');
                $bookmark->save();

                $status = true;
            }
        }

        return response()->json([
            'status' => $status,
            'id' => $bookmarkID
        ]);
    }

    public function delete(Request $request)
    {
        $status = false;

        $bookID = $request->input('book');
        $bookmarkID = $request->input('bookmark');
        $bookmarks = Book::find($bookID)->bookmarks()->get();

        if(Auth::user()->books->contains($bookID) && $bookmarks->contains($bookmarkID))
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
