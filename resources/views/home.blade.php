@extends('layouts.app', ['logo' => true])

@section('content')
<div class="row m-0 justify-content-center">
    <div class="mt-4 col-10 col-xl-8">
        @if(session('message_limit'))
            <span class="alert d-block mt-1 alert-danger text-center" role="alert">
                <strong>{{ session('message_limit') }}</strong>
            </span>
        @endif

        <library-menu
            search-text="{{trans('library.search')}}"
            add-collection-text="{{trans('library.add_collection')}}"
            add-book-text="{{trans('library.add_book')}}"
        />
    </div>
</div>
@endsection
