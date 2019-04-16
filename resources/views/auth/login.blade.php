@extends('layouts.app')
@section('bg', 'blur-bg')

@section('content')
    <div class="row h-100 justify-content-center align-items-center">
        <div class="col-6 col-md-4 col-xl-3">
            <img class="bg-alpha rounded-circle mx-auto d-block mb-5" src="./images/user.png">
            <div>
                <form method="POST" action="{{ route('login') }}">
                    @csrf

                    <div class="form-group">
                        <input 
                        type="email" 
                        class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" 
                        name="email" value="{{ old('email') }}" 
                        placeholder="{{ __('E-Mail Address') }}" 
                        required 
                        autofocus>

                        @if ($errors->has('email'))
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif
                    </div>

                    <div class="form-group">
                        <input 
                        type="password" 
                        class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" 
                        name="password" 
                        placeholder="{{ __('Password') }}" 
                        required>

                        @if ($errors->has('password'))
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $errors->first('password') }}</strong>
                            </span>
                        @endif
                    </div>

                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                            <label class="form-check-label" for="remember">
                                {{ __('Remember Me') }}
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <button type="submit" class="btn btn-primary">
                            {{ __('Login') }}
                        </button>

                        <a href="{{ route('register') }}" class="btn btn-primary">Register</a>

                        @if (Route::has('password.request'))
                            <a class="btn btn-link" href="{{ route('password.request') }}">
                                {{ __('Forgot Your Password?') }}
                            </a>
                        @endif
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
