@extends('layouts.app', ['logo' => true])

@section('content')
    @component('components.settings', ['option' => 1])
        @slot('form')
            <form class="row justify-content-center" action="#">
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

                <div class="form-group col-8 m-0">
                    <button type="submit" class="form-btn">
                        Aplicar cambios
                    </button>
                </div>
            </form>
        @endslot
    @endcomponent
@endsection
