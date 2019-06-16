@extends('layouts.app', ['logo' => true])

@section('content')
<div class="row m-0 justify-content-center">
    <div class="mt-2 col">
        <div class="row m-0 justify-content-center">
            @if ($errors->has('buy'))
                <div class="alert d-block alert-danger col-11 col-sm-8" role="alert">
                    <strong>{{ $errors->first('buy') }}</strong>
                </div>
            @endif

            @if (session('status'))
                <div class="alert d-block alert-success col-11 col-sm-8" role="alert">
                    <strong>{{ trans("storage.buyOk") }}</strong>
                </div>
            @endif
            <div class="col-11 col-sm-8">
                <table class="table table-borderless">
                    <thead>
                        <tr>
                            <th></th>
                            @foreach ($storages as $storage)
                            <th class="table-option text-center">
                                <p>{{ trans($storage->name) }} ({{ $storage->price }} €)</p>
                                @if ($storage->id !== Auth::user()->storage_id)
                                <form method="POST" action="{{ route('storage.buy') }}">
                                    @csrf
                                    <button class="form-btn" type="submit" name="buy" value="{{ $storage->id }}">{{trans("storage.buy")}}</button>
                                </form>
                                @endif
                            </th>
                            @endforeach
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th class="table-option">{{trans("storage.nDocuments")}}</th>
                            @foreach ($storages as $storage)
                            <td class="table-data">{{ $storage->amount_books }}</td>
                            @endforeach
                        </tr>
                        <tr>
                            <th class="table-option">{{trans("storage.sizeDocuments")}}</th>
                            @foreach ($storages as $storage)
                            <td class="table-data">{{ $storage->size_books / 1000 }} MB</td>
                            @endforeach
                        </tr>
                        <tr>
                            <th class="table-option">{{trans("storage.shareDocuments")}}</th>
                            @foreach ($storages as $storage)
                            <td class="table-data">{{ $storage->share_documents ? trans("storage.yes") : trans("storage.no") }}</td>
                            @endforeach
                        </tr>
                        <tr>
                            <th class="table-option">{{trans("storage.nCollections")}}</th>
                            @foreach ($storages as $storage)
                            <td class="table-data">{{ $storage->amount_collections }}</td>
                            @endforeach
                        </tr>
                        <tr>
                            <th class="table-option">{{trans("storage.shareCollections")}}</th>
                            @foreach ($storages as $storage)
                            <td class="table-data">{{ $storage->share_collections ? trans("storage.yes") : trans("storage.no") }}</td>
                            @endforeach
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection
