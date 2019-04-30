@extends('layouts.app', ['logo' => true])

@section('content')
<div class="row m-0 justify-content-center">
    <div class="mt-2 col">
        <div class="row m-0 justify-content-center">
            <div class="col-11 p-0 mb-5">
                <div class="main-card mx-auto">
                    <h2 class="main-title">{{trans("index.main_title")}}</h2>
                    <a class="main-btn" href="{{ route('register') }}">{{trans("index.main_button")}}</a>
                </div>
            </div>

            <div class="col-11 col-md-3 m-3 simple-card">
                <h5 class="simple-title">{{trans("index.box1_title")}}</h5>
                <div class="simple-content">{{trans("index.box1_content")}}</div>
            </div>
            <div class="col-11 col-md-3 m-3 simple-card">
                <h5 class="simple-title">{{trans("index.box2_title")}}</h5>
                <div class="simple-content">{{trans("index.box2_content")}}</div>
            </div>
            <div class="col-11 col-md-3 m-3 simple-card">
                <h5 class="simple-title">{{trans("index.box3_title")}}</h5>
                <div class="simple-content">{{trans("index.box3_content")}}</div>
            </div>
        </div>
    </div>
</div>
@endsection
