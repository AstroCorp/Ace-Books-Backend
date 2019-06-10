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
        //
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
        $books = Auth::user()->books->all();

        return view('collection_edit', compact('books', 'collection'));
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
        //
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

        return redirect()->route('home')->with(['status' => true, 'type' => 'collection', 'name' => $collection->name]);
    }
}
