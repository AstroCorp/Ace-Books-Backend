@extends('layouts.app')
@section('bg', 'blur-bg')

@section('content')
<div class="row m-0 h-100 justify-content-center align-items-center">
    <div class="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 auth-form">
        <div>
            <img class="img-fluid bg-alpha rounded-circle mx-auto d-block mb-5" src="{{ asset('images/user.png') }}">

            <form method="POST" action="{{ route('login') }}">
                @csrf

                <div class="form-group">
                    <input type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}"
                        name="email" value="{{ old('email') }}" placeholder="{{ __('E-Mail Address') }}" required
                        autofocus>

                    @if ($errors->has('email'))
                    <span class="alert d-block mt-1 alert-danger" role="alert">
                        <strong>{{ $errors->first('email') }}</strong>
                    </span>
                    @endif
                </div>

                <div class="row m-0 form-group">
                    <input type="password" class="col form-control{{ $errors->has('password') ? ' is-invalid' : '' }}"
                        name="password" placeholder="{{ __('Password') }}" required>

                    <button type="submit" class="col form-btn">
                        <span class="icon-next icon-centered"></span>
                    </button>

                    @if ($errors->has('password'))
                    <span class="alert d-block mt-1 alert-danger" role="alert">
                        <strong>{{ $errors->first('password') }}</strong>
                    </span>
                    @endif
                </div>

                <div class="row">
                    <div class="col-12 col-sm-6 mt-3 mb-2 mb-sm-0 form-group">
                        <label class="custom-checkbox">
                            <span class="btn-link-secondary">{{ __('Remember Me') }}</span>
                            <input class="form-check-input" type="checkbox" name="remember" id="remember"
                                {{ old('remember') ? 'checked' : '' }}>
                            <span class="checkmark"></span>
                        </label>
                    </div>

                    <div class="col-12 col-sm-6 mt-sm-3 text-sm-right">
                        <div class="form-group">
                            @if (Route::has('password.request'))
                            <a class="btn-link-secondary"
                                href="{{ route('password.request') }}">{{ __('Forgot Your Password?') }}</a>
                            @endif
                        </div>

                        <div class="from-group">
                            <a href="{{ route('register') }}" class="btn-link-secondary">{{ __('Register') }}</a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
