<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Book;
use App\Rules\CheckCollection;
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
            'image' => ['image', 'max:2000'], // 2 MB
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'collection' => ['nullable', 'integer', new CheckCollection]
        ]);

        $book = new Book();

        $book->user_id = $request->user()->id;
        $book->collection_id = $request->input('collection');
        $book->name = $request->input('name');
        $book->description = $request->input('description');

        $request->user()->n_books += 1;

        // Subida de imagen
        if($request->hasFile('image'))
        {
            $image = $request->file('image');

            $imageName = Str::uuid().".".$image->getClientOriginalExtension();
            $image->move(public_path().'/images/books/', $imageName);

            $book->image = $imageName;
        }

        // Subida de archivo
        $file = $request->file('file');

        $fileName = Str::uuid().".".$file->getClientOriginalExtension();
        $file->move(public_path().'/books/', $fileName);

        $book->fileName = $fileName;

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
        return view('book_show');
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
            'image' => ['image', 'max:2000'], // 2 MB
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'collection' => ['nullable', 'integer', new CheckCollection]
        ]);

        $book->collection_id = $request->input('collection');
        $book->name = $request->input('name');
        $book->description = $request->input('description');

        // Subida de imagen
        if($request->hasFile('image'))
        {
            $image = $request->file('image');

            $imageName = Str::uuid().".".$image->getClientOriginalExtension();
            $image->move(public_path().'/images/books/', $imageName);

            $book->image = $imageName;
        }

        $book->save();

        return redirect()->route('book.edit', $book->id)->with('status', true);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // el documento es eliminado, además de desaparecer de la base de datos
        // unlink(public_path().'/images/profiles/2.jpg');
        dd('hello');
    }
}
