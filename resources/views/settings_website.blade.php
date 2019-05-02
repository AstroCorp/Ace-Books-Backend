@extends('layouts.app', ['logo' => true])

@section('content')
    @component('components.settings', ['option' => 1])
        @slot('form')
            <form class="row justify-content-center" method="POST" action="{{ route('website.update') }}">
                @csrf

                @if(session('status'))
                    <div class="alert d-block alert-success col-8" role="alert">
                        <strong>{{ trans("settings.message_success") }}</strong>
                    </div>
                @endif

                <div class="form-group col-8 p-0">
                    <select id="lang" class="form-control{{ $errors->has('lang') ? ' is-invalid' : '' }}" name="lang" required>
                        <option disabled selected hidden>{{ __('Select a language') }}</option>
                        @foreach ($langs as $lang)
                            <option {{ $lang->id === Auth::user()->lang_id ? 'selected' : '' }} 
                                value="{{ $lang->id }}">{{ trans($lang->name) }}</option>
                        @endforeach
                    </select>

                    @if ($errors->has('lang'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('lang') }}</strong>
                        </span>
                    @endif
                </div>

                <div class="form-group col-8 m-0 p-0">
                    <button type="submit" class="form-btn">
                        {{ __('Apply changes') }}
                    </button>
                </div>
            </form>
        @endslot
    @endcomponent
@endsection
