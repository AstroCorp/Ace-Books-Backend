@extends('layouts.app', ['logo' => true])

@section('content')
<div class="row m-0 justify-content-center">
    <div class="mt-4 col-10 col-xl-8">
        <div class="card">
            <div class="card-header">{{trans("books.create")}}</div>
            <div class="card-body">
                <form class="row justify-content-center" method="POST" action="{{ route('book.store') }}" enctype="multipart/form-data">
                    @csrf

                    @if(session('status'))
                        <div class="alert d-block alert-success col-8" role="alert">
                            <strong>{{ trans("books.message_success1") }}</strong>
                        </div>
                    @endif

                    <div class="form-group col-10 p-0 text-center mb-3">
                        <input-file-custom button-text="{{trans('books.select_book')}}"/>
                    </div>
                    @if ($errors->has('file'))
                        <span class="col-10 alert d-block mt-1 alert-danger" role="alert">
                            <strong>{{ $errors->first('file') }}</strong>
                        </span>
                    @endif

                    <div class="form-group col-10 p-0">
                        <input-file-with-image-preview text-input="{{ trans('books.input_img') }}" type="library" />
                    </div>
                    <div class="alert d-block alert-info col-8" role="alert">
                        <strong>{{ trans("books.image_info") }}</strong>
                    </div>
                    @if ($errors->has('image'))
                        <span class="col-10 alert d-block mt-1 alert-danger" role="alert">
                            <strong>{{ $errors->first('image') }}</strong>
                        </span>
                    @endif

                    <div class="form-group col-10 p-0">
                        <input type="text" id="name" name="name" placeholder="* {{ trans('books.input_name') }}"
                        class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" required>

                        @if ($errors->has('name'))
                        <span class="alert d-block mt-1 alert-danger" role="alert">
                            <strong>{{ $errors->first('name') }}</strong>
                        </span>
                        @endif
                    </div>

                    <div class="form-group col-10 p-0">
                        <input type="text" id="description" name="description" placeholder="{{ trans('books.input_description') }}"
                        class="form-control{{ $errors->has('description') ? ' is-invalid' : '' }}">

                        @if ($errors->has('description'))
                        <span class="alert d-block mt-1 alert-danger" role="alert">
                            <strong>{{ $errors->first('description') }}</strong>
                        </span>
                        @endif
                    </div>

                    <div class="form-group col-10 p-0 {{ count($collections) === 0 ? ' hidden' : '' }}">
                        <select id="collection" class="form-control{{ $errors->has('collection') ? ' is-invalid' : '' }}" name="collection">
                            <option disabled selected hidden>{{ trans('books.input_collection') }}</option>
                            <option value="">{{ trans('books.collectionNull') }}</option>
                            @foreach ($collections as $collection)
                                <option value="{{ $collection->id }}">{{ $collection->name }}</option>
                            @endforeach
                        </select>

                        @if ($errors->has('collection'))
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $errors->first('collection') }}</strong>
                            </span>
                        @endif
                    </div>

                    <div class="form-group col-12 m-0 p-0 text-center">
                        <button type="submit" class="form-btn">
                            {{trans("books.create")}}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
