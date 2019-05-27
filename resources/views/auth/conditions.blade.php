@extends('layouts.app', ['logo' => true])

@section('content')
<div class="row m-0 justify-content-center">
    <div class="mt-4 col-10 col-xl-8">
        <div id="accordion">
            <h1 class="title-form">{{trans("termsAndConditions.mainTitle")}}</h1>
            <div class="card mb-1">
                <button id="heading_1" class="card-header btn collapsed" data-toggle="collapse"
                    data-target="#collapse_1" aria-expanded="false" aria-controls="collapse_1">
                    <h5 class="m-0 text-left">{{trans("termsAndConditions.title1")}}</h5>
                </button>

                <div id="collapse_1" class="collapse" aria-labelledby="heading_1" data-parent="#accordion">
                    <div class="card-body">
                        <p>{{trans("termsAndConditions.text1-1")}}</p>
                    </div>
                </div>
            </div>

            <div class="card mb-1">
                <button id="heading_2" class="card-header btn collapsed" data-toggle="collapse"
                    data-target="#collapse_2" aria-expanded="false" aria-controls="collapse_2">
                    <h5 class="m-0 text-left">{{trans("termsAndConditions.title2")}}</h5>
                </button>
                <div id="collapse_2" class="collapse" aria-labelledby="heading_2" data-parent="#accordion">
                    <div class="card-body">
                        <p>{{trans("termsAndConditions.text2-1")}}</p>
                    </div>
                </div>
            </div>

            <div class="card mb-1">
                <button id="heading_3" class="card-header btn collapsed" data-toggle="collapse"
                    data-target="#collapse_3" aria-expanded="false" aria-controls="collapse_3">
                    <h5 class="m-0 text-left">{{trans("termsAndConditions.title3")}}</h5>
                </button>
                <div id="collapse_3" class="collapse" aria-labelledby="heading_3" data-parent="#accordion">
                    <div class="card-body">
                        <p>{{trans("termsAndConditions.text3-1")}}</p>
                    </div>
                </div>
            </div>

            <div class="card mb-1">
                <button id="heading_4" class="card-header btn collapsed" data-toggle="collapse"
                    data-target="#collapse_4" aria-expanded="false" aria-controls="collapse_4">
                    <h5 class="m-0 text-left">{{trans("termsAndConditions.title4")}}</h5>
                </button>
                <div id="collapse_4" class="collapse" aria-labelledby="heading_4" data-parent="#accordion">
                    <div class="card-body">
                        <p class="mb-3">{{trans("termsAndConditions.text4-1")}}</p>
                        <p>{{trans("termsAndConditions.text4-2")}}</p>
                    </div>
                </div>
            </div>

            <div class="card mb-1">
                <button id="heading_5" class="card-header btn collapsed" data-toggle="collapse"
                    data-target="#collapse_5" aria-expanded="false" aria-controls="collapse_5">
                    <h5 class="m-0 text-left">{{trans("termsAndConditions.title5")}}</h5>
                </button>
                <div id="collapse_5" class="collapse" aria-labelledby="heading_5" data-parent="#accordion">
                    <div class="card-body">
                        <p class="mb-3">{{trans("termsAndConditions.text5-1")}}</p>
                        <p class="mb-3">{{trans("termsAndConditions.text5-2")}}</p>
                        <p>{{trans("termsAndConditions.text5-3")}}</p>
                    </div>
                </div>
            </div>

            <div class="card mb-1">
                <button id="heading_6" class="card-header btn collapsed" data-toggle="collapse"
                    data-target="#collapse_6" aria-expanded="false" aria-controls="collapse_6">
                    <h5 class="m-0 text-left">{{trans("termsAndConditions.title6")}}</h5>
                </button>
                <div id="collapse_6" class="collapse" aria-labelledby="heading_6" data-parent="#accordion">
                    <div class="card-body">
                        <p class="mb-3">{{trans("termsAndConditions.text6-1")}}</p>
                        <p>{{trans("termsAndConditions.text6-2")}}</p>
                    </div>
                </div>
            </div>

            <div class="card">
                <button id="heading_7" class="card-header btn collapsed" data-toggle="collapse"
                    data-target="#collapse_7" aria-expanded="false" aria-controls="collapse_7">
                    <h5 class="m-0 text-left">{{trans("termsAndConditions.title7")}}</h5>
                </button>
                <div id="collapse_7" class="collapse" aria-labelledby="heading_7" data-parent="#accordion">
                    <div class="card-body">
                        <p>{{trans("termsAndConditions.text7-1")}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
