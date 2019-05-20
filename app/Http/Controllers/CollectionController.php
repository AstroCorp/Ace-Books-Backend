<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Collection;

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
        return view('collection_create');
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
        // listaría los libros que hay dentro
        return view('collection_show');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Collection $collection)
    {
        return view('collection_edit');
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
    public function destroy(Collection $collection)
    {
        // además de eliminarla de la base de datos, todos los libros asignadas a esta ahora son null
    }
}
