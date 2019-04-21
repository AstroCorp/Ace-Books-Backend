@extends('layouts.app')
@section('bg', 'blur-bg')

@section('content')
<div class="row m-0 h-100 justify-content-center align-items-center">
    <div class="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 auth-form">
        <div>
            <div>
                <img class="img-fluid bg-alpha rounded-circle mx-auto d-block mb-5" src="{{ asset('images/password.png') }}">
                <h3 class="text-center title-form pb-1">{{ __('Reset Password') }} - {{  __('Step') }} 2</h3>
            </div>

            <div>
                <form method="POST" action="{{ route('password.update') }}">
                    @csrf

                    <input type="hidden" name="token" value="{{ $token }}">

                    <div class="form-group">
                        <input id="email" type="email"
                            class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email"
                            value="{{ $email ?? old('email') }}" required
                            placeholder="{{ __('E-Mail Address') }}" autofocus>

                        @if ($errors->has('email'))
                        <span class="alert col-12 d-block mt-1 alert-danger" role="alert">
                            <strong>{{ $errors->first('email') }}</strong>
                        </span>
                        @endif
                    </div>

                    <div class="form-group">
                        <input id="password" type="password"
                            class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password"
                            placeholder="{{ __('Password') }}" required>

                        @if ($errors->has('password'))
                        <span class="alert col-12 d-block mt-1 alert-danger" role="alert">
                            <strong>{{ $errors->first('password') }}</strong>
                        </span>
                        @endif
                    </div>

                    <div class="row m-0 form-group">
                        <input id="password-confirm" type="password" class="col form-control"
                            name="password_confirmation"
                            placeholder="{{ __('Confirm Password') }}" required>

                        <button type="submit" class="col form-btn">
                            <span class="icon-next icon-centered"></span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
