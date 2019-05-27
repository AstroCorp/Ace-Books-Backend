@extends('layouts.app', ['logo' => true])

@section('content')
<div class="row m-0 justify-content-center h-100">
    <div class="mt-4 col-10 col-xl-8">
        <pdf-viewer url='/books/{{ $book->filename }}' />
    </div>
</div>
@endsection
