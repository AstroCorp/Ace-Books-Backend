<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Collection;
use App\Rules\CheckCollectionName;
use App\Rules\CheckBookOwner;

class CollectionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('verified'); // E-Mail verificado
        $this->middleware('checkAddCollection')->only(['create', 'store']); // Límite de la tarifa
        $this->middleware('checkCollectionOwner')->except(['create', 'store']); // Esto limita el acceso solo al dueño
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $books = json_encode(Auth::user()->books->map->only(['id', 'name']));

        return view('collection_create', compact('books'));
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
            'image' => ['image', 'max:500'], // 500 Kb
            'name' => ['required', 'string', new CheckCollectionName],
            'description' => ['nullable', 'string'],
            'bookCollection' => ['nullable', 'array', new CheckBookOwner]
        ]);

        $collection = new Collection();

        $collection->user_id = $request->user()->id;
        $collection->name = $request->input('name');
        $collection->description = $request->input('description');

        $request->user()->n_collections += 1;
        $request->user()->save();

        // Subida de imagen
        if($request->hasFile('image'))
        {
            $collection->setImage($request->file('image'));
        }

        $collection->save();

        $collection->addBooks($request->input('bookCollection'));

        return redirect()->route('collection.create')->with('status', true);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Collection $collection)
    {
        $books = $collection->books()->paginate(15);

        return view('collection_show', compact('books'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Collection $collection)
    {
        $booksInCollection = $collection->books->pluck('id')->toArray();

        $collectionBooks = json_encode($collection->books->map->only(['id', 'name']));
        $books = json_encode(Auth::user()->books->except($booksInCollection)->map->only(['id', 'name']));

        return view('collection_edit', compact('books', 'collectionBooks', 'collection'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Collection $collection)
    {
        $request->validate([
            'image' => ['image', 'max:500'], // 500 Kb
            'name' => ['required', 'string', new CheckCollectionName($collection->id)],
            'description' => ['nullable', 'string'],
            'bookCollection' => ['nullable', 'array', new CheckBookOwner]
        ]);

        $collection->name = $request->input('name');
        $collection->description = $request->input('description');

        // Subida de imagen
        if($request->hasFile('image'))
        {
            $collection->setImage($request->file('image'));
        }

        $collection->updateBooks($request->input('bookCollection'));

        $collection->save();

        return redirect()->route('collection.edit', $collection->id)->with('status', true);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Collection $collection)
    {
        if($request->has('collectionOption'))
        {
            $collection->deleteWithBooks();
        }
        else
        {
            $collection->deleteWithoutBooks();
        }

        $request->user()->n_collections -= 1;
        $request->user()->save();

        return redirect()->route('home')->with(['status' => true, 'type' => 'collection', 'name' => $collection->name]);
    }
}
