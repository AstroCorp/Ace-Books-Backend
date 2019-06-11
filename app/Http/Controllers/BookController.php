<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Book;
use App\Rules\CheckCollection;
use App\Rules\CheckBookName;
use Illuminate\Support\Str;

class BookController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('verified'); // E-Mail verificado
        $this->middleware('checkAddBook')->only(['create', 'store']); // Límite de la tarifa
        $this->middleware('checkBookOwner')->except(['create', 'store']); // Esto limita el acceso solo al dueño
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $collections = Auth::user()->collections->all();

        return view('book_create', compact('collections'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'file' => ['required', 'file', 'mimetypes:application/pdf', 'max:'.$request->user()->storage->size_books],
            'image' => ['image', 'max:500'], // 500 Kb
            'name' => ['required', 'string', new CheckBookName],
            'description' => ['nullable', 'string'],
            'collection' => ['nullable', 'integer', new CheckCollection]
        ]);

        $book = new Book();

        $book->user_id = $request->user()->id;
        $book->collection_id = $request->input('collection');
        $book->name = $request->input('name');
        $book->description = $request->input('description');

        $request->user()->n_books += 1;
        $request->user()->save();

        // Subida de imagen
        if($request->hasFile('image'))
        {
            $book->setImage($request->file('image'));
        }

        // Subida de archivo
        $book->setPDF($request->file('file'));

        $book->save();

        return redirect()->route('book.create')->with('status', true);
    }

    /**
     * Display the specified resource.
     *
     * @param  Book  $book
     * @return \Illuminate\Http\Response
     */
    public function show(Book $book)
    {
        // esto sería el lector como tal
        return view('book_show', compact('book'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  Book  $book
     * @return \Illuminate\Http\Response
     */
    public function edit(Book $book)
    {
        $collections = Auth::user()->collections->all();

        return view('book_edit', compact('collections', 'book'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Book  $book
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Book $book)
    {
        $request->validate([
            'image' => ['image', 'max:500'], // 500 Kb
            'name' => ['required', 'string', new CheckBookName($book->id)],
            'description' => ['nullable', 'string'],
            'collection' => ['nullable', 'integer', new CheckCollection]
        ]);

        $book->collection_id = $request->input('collection');
        $book->name = $request->input('name');
        $book->description = $request->input('description');

        // Subida de imagen
        if($request->hasFile('image'))
        {
            $book->setImage($request->file('image'));
        }

        $book->save();

        return redirect()->route('book.edit', $book->id)->with('status', true);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Book $book
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Book $book)
    {
        $book->remove();
        $request->user()->n_books -= 1;
        $request->user()->save();

        return back()->with(['status' => true, 'type' => 'book', 'name' => $book->name]);
    }
}
