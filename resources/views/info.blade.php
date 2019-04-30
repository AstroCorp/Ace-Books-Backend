@extends('layouts.app', ['logo' => true])

@section('content')
<div class="row m-0 justify-content-center">
    <div class="mt-4 col-10 col-xl-8">
        <div id="accordion">
            <h1 class="title-form">{{trans("info.main_title")}}</h1>
            <h3 class="mt-4 title-form">{{trans("info.section1_title")}}</h3>
            <div class="card mb-1">
                <button id="heading_1" class="card-header btn collapsed" data-toggle="collapse"
                    data-target="#collapse_1" aria-expanded="false" aria-controls="collapse_1">
                    <h5 class="m-0 text-left">{{trans("info.section1_q1_title")}}</h5>
                </button>

                <div id="collapse_1" class="collapse" aria-labelledby="heading_1" data-parent="#accordion">
                    <div class="card-body">
                        <p>{{trans("info.section1_q1_content")}}</p>
                    </div>
                </div>
            </div>
            <div class="card">
                <button id="heading_2" class="card-header btn collapsed" data-toggle="collapse"
                    data-target="#collapse_2" aria-expanded="false" aria-controls="collapse_2">
                    <h5 class="m-0 text-left">{{trans("info.section1_q2_title")}}</h5>
                </button>
                <div id="collapse_2" class="collapse" aria-labelledby="heading_2" data-parent="#accordion">
                    <div class="card-body">
                        <p>{{trans("info.section1_q2_content1")}}</p>
                        <p>{{trans("info.section1_q2_content2")}}</p>
                    </div>
                </div>
            </div>

            <h3 class="mt-4 title-form">{{trans("info.section2_title")}}</h3>
            <div class="card mb-1">
                <button id="heading_3" class="card-header btn collapsed" data-toggle="collapse"
                    data-target="#collapse_3" aria-expanded="false" aria-controls="collapse_3">
                    <h5 class="m-0 text-left">{{trans("info.section2_q1_title")}}</h5>
                </button>

                <div id="collapse_3" class="collapse" aria-labelledby="heading_3" data-parent="#accordion">
                    <div class="card-body">
                        <p>{{trans("info.section2_q1_content")}}</p>
                    </div>
                </div>
            </div>
            <div class="card mb-1">
                <button id="heading_4" class="card-header btn collapsed" data-toggle="collapse"
                    data-target="#collapse_4" aria-expanded="false" aria-controls="collapse_4">
                    <h5 class="m-0 text-left">{{trans("info.section2_q1_title")}}</h5>
                </button>
                <div id="collapse_4" class="collapse" aria-labelledby="heading_4" data-parent="#accordion">
                    <div class="card-body">
                        <p>{{trans("info.section2_q2_content")}}</p>
                    </div>
                </div>
            </div>
            <div class="card">
                <button id="heading_5" class="card-header btn collapsed" data-toggle="collapse"
                    data-target="#collapse_5" aria-expanded="false" aria-controls="collapse_5">
                    <h5 class="m-0 text-left">{{trans("info.section2_q3_title")}}</h5>
                </button>
                <div id="collapse_5" class="collapse" aria-labelledby="heading_5" data-parent="#accordion">
                    <div class="card-body">
                        <p>{{trans("info.section2_q3_content")}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
