@extends('layouts.app', ['logo' => true])

@section('content')
<div class="row m-0 justify-content-center">
    <div class="mt-2 col">
        <div class="row m-0 justify-content-center">
            <div class="col-11 col-sm-8">
                <table class="table table-borderless">
                    <thead>
                        <tr>
                            <th></th>
                            <th class="table-option text-center">
                                <p>{{trans("storage.package1")}} (0 €)</p>
                                <form method="POST" action="{{ route('storage.buy') }}">
                                    @csrf
                                    <button class="form-btn" type="submit" name="buy" value="1">{{trans("storage.buy")}}</button>
                                </form>
                            </th>
                            <th class="table-option text-center">
                                <p>{{trans("storage.package2")}} (4.95 €)</p>
                                <form method="POST" action="{{ route('storage.buy') }}">
                                    @csrf
                                    <button class="form-btn" type="submit" name="buy" value="1">{{trans("storage.buy")}}</button>
                                </form>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th class="table-option">{{trans("storage.nDocuments")}}</th>
                            <td class="table-data">10</td>
                            <td class="table-data">50</td>
                        </tr>
                        <tr>
                            <th class="table-option">{{trans("storage.sizeDocuments")}}</th>
                            <td class="table-data">5 MB</td>
                            <td class="table-data">10 MB</td>
                        </tr>
                        <tr>
                            <th class="table-option">{{trans("storage.shareDocuments")}}</th>
                            <td class="table-data">{{trans("storage.yes")}}</td>
                            <td class="table-data">{{trans("storage.yes")}}</td>
                        </tr>
                        <tr>
                            <th class="table-option">{{trans("storage.nCollections")}}</th>
                            <td class="table-data">5</td>
                            <td class="table-data">15</td>
                        </tr>
                        <tr>
                            <th class="table-option">{{trans("storage.shareCollections")}}</th>
                            <td class="table-data">{{trans("storage.no")}}</td>
                            <td class="table-data">{{trans("storage.yes")}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection
