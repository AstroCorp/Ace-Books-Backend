@extends('layouts.app', ['logo' => true])

@section('content')
    @component('components.settings', ['option' => 0])
        @slot('form')
            <form class="row justify-content-center" action="#">
                <input type="hidden" name="update" value="0">

                <div class="form-group col-8">
                    <input type="text" class="form-control{{ $errors->has('username') ? ' is-invalid' : '' }}"
                        name="username" value="{{ old('username') }}" placeholder="Username" required autofocus>

                    @if ($errors->has('username'))
                    <span class="alert d-block mt-1 alert-danger" role="alert">
                        <strong>{{ $errors->first('username') }}</strong>
                    </span>
                    @endif
                </div>

                <div class="form-group col-8">
                    <input id="password" type="password"
                        class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password"
                        placeholder="{{ __('Password') }}" required>

                    @if ($errors->has('password'))
                    <span class="alert d-block mt-1 alert-danger" role="alert">
                        <strong>{{ $errors->first('password') }}</strong>
                    </span>
                    @endif
                </div>

                <div class="form-group col-8">
                    <input id="password-confirm" type="password" class="form-control"
                        name="password_confirmation"
                        placeholder="{{ __('Confirm Password') }}" required>
                </div>

                <div class="form-group col-8 m-0">
                    <button type="submit" class="form-btn">
                        Aplicar cambios
                    </button>
                </div>
            </form>
        @endslot
    @endcomponent
@endsection
