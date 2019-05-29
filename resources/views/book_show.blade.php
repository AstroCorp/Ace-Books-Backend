@extends('layouts.lector')

@section('content')
<div class="row m-0 justify-content-center h-100">
    <div class="col-12 p-0">
        <pdf-viewer url='/books/{{ $book->filename }}' />
    </div>
</div>
@endsection
