@extends('layouts.app')
@section('bg', 'blur-bg')

@section('content')
<div class="row m-0 h-100 justify-content-center align-items-center">
    <div class="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 auth-form">
        <div>
            <img class="bg-alpha rounded-circle mx-auto d-block mb-5" src="{{ asset('images/new-user.png') }}">

            <div>
                <form method="POST" action="{{ route('register') }}">
                    @csrf

                    <div class="form-group">
                        <input id="email" type="email"
                            class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email"
                            value="{{ old('email') }}" 
                            placeholder="{{ __('E-Mail Address') }}" required>

                        @if ($errors->has('email'))
                        <span class="alert d-block mt-1 alert-danger" role="alert">
                            <strong>{{ $errors->first('email') }}</strong>
                        </span>
                        @endif
                    </div>

                    <div class="form-group">
                        <input id="password" type="password"
                            class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password"
                            placeholder="{{ __('Password') }}" required>

                        @if ($errors->has('password'))
                        <span class="alert d-block mt-1 alert-danger" role="alert">
                            <strong>{{ $errors->first('password') }}</strong>
                        </span>
                        @endif
                    </div>

                    <div class="form-group row m-0">
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
