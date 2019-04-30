@extends('layouts.app', ['logo' => true])

@section('content')
<div class="row m-0 justify-content-center">
    <div class="mt-4 col-10 col-xl-8">
        <div class="card row flex-row">
            <div class="card-header col-12 col-md-4">
                <h3 class="mt-2 mb-5">Configuración</h3>
                <h5 class="mb-3">Editar perfil</h5>
                <h5>Ajustes de la web</h5>
            </div>
            <div class="card-body col-12 col-md-8">
                <form id="profile" class="row justify-content-center" action="#">
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
                </form>
                <form id="website" class="row justify-content-center" action="#">
                    <input type="hidden" name="update" value="1">

                    <div class="form-group col-8">
                        <select id="lang" class="form-control{{ $errors->has('lang') ? ' is-invalid' : '' }}" name="lang" required>
                            <option disabled selected hidden>{{ __('Select a language') }}</option>
                            @foreach ($langs as $lang)
                                <option value="{{ $lang->id }}">{{ trans($lang->name) }}</option>
                            @endforeach
                        </select>

                        @if ($errors->has('lang'))
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $errors->first('lang') }}</strong>
                            </span>
                        @endif
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
