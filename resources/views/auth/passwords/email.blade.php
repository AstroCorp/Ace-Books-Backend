@extends('layouts.app', ['logo' => false])
@section('bg', 'blur-bg')

@section('content')
<div class="row m-0 h-100 justify-content-center align-items-center">
    <div class="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 auth-form">
        <div>
            <div>
                <img class="img-fluid bg-alpha rounded-circle mx-auto d-block mb-4" src="{{ asset('images/password.png') }}">
                <h3 class="text-center title-form pb-1">{{ __('Reset Password') }} - {{  __('Step') }} 1</h3>
            </div>

            <div>
                @if (session('status'))
                    <div class="alert alert-success" role="alert">
                        {{ session('status') }}
                    </div>
                @endif

                <form method="POST" action="{{ route('password.email') }}">
                    @csrf

                    <div class="row m-0 form-group">
                        <input id="email" type="email"
                            class="col form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email"
                            value="{{ old('email') }}"
                            placeholder="{{ __('E-Mail Address') }}" required>

                        <button type="submit" class="col form-btn form-btn-arrow">
                            <span class="icon-next icon-centered"></span>
                        </button>

                        @if ($errors->has('email'))
                            <div class="alert col-12 d-block mt-1 alert-danger" role="alert">
                                <strong>{{ $errors->first('email') }}</strong>
                            </div>
                        @endif
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
