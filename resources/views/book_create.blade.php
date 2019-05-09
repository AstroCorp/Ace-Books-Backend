@extends('layouts.app', ['logo' => true])

@section('content')
<div class="row m-0 justify-content-center">
    <div class="mt-4 col-10 col-xl-8">
        <div class="card">
            <div class="card-header">{{trans("books.create")}}</div>
            <div class="card-body">
                <form class="row justify-content-center" method="POST" action="{{ route('book.store') }}" enctype="multipart/form-data">
                    <div class="form-group col-10 p-0">
                        <input-file-with-image-preview image="{{ asset('images/null.png') }}" type="library" />                 
                    </div>
                    @if ($errors->has('image'))
                        <span class="alert d-block mt-1 alert-danger" role="alert">
                            <strong>{{ $errors->first('image') }}</strong>
                        </span>
                    @endif

                    <div class="form-group col-10 p-0">
                        <input type="text" id="name" name="name" placeholder="{{ trans('books.input_name') }}"
                        class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" required>

                        @if ($errors->has('name'))
                        <span class="alert d-block mt-1 alert-danger" role="alert">
                            <strong>{{ $errors->first('name') }}</strong>
                        </span>
                        @endif
                    </div>

                    <div class="form-group col-10 p-0">
                        <input type="text" id="description" name="description" placeholder="{{ trans('books.input_description') }}"
                        class="form-control{{ $errors->has('description') ? ' is-invalid' : '' }}" required>

                        @if ($errors->has('description'))
                        <span class="alert d-block mt-1 alert-danger" role="alert">
                            <strong>{{ $errors->first('description') }}</strong>
                        </span>
                        @endif
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
