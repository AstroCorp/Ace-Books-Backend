@extends('layouts.app', ['logo' => true])

@section('content')
<div class="row m-0 justify-content-center">
    <div class="mt-4 col-10 col-xl-8">
        <library-menu
            create-collection-url="{{ route('collection.create') }}"
            create-book-url="{{ route('book.create') }}"

            search-text="{{trans('library.search')}}"
            add-collection-text="{{trans('library.add_collection')}}"
            add-book-text="{{trans('library.add_book')}}"
        />
    </div>
</div>
@endsection
