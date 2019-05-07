@extends('layouts.app', ['logo' => true])

@section('content')
    @component('components.settings', ['option' => 0])
        @slot('form')
            <form class="row justify-content-center" method="POST" action="{{ route('profile.update') }}">
                @csrf

                @if(session('status'))
                    <div class="alert d-block alert-success col-8" role="alert">
                        <strong>{{ trans("settings.message_success") }}</strong>
                    </div>
                @endif

                <div class="form-group col-8 p-0">
                    <input-file-with-image-preview image="{{ asset('images/profiles/'.Auth::user()->user_image) }}" />

                    @if ($errors->has('username'))
                    <span class="alert d-block mt-1 alert-danger" role="alert">
                        <strong>{{ $errors->first('image') }}</strong>
                    </span>
                    @endif
                </div>

                <div class="form-group col-8 p-0">
                    <input type="text" class="form-control{{ $errors->has('username') ? ' is-invalid' : '' }}"
                        name="username" value="{{ old('username') ? old('username') : Auth::user()->username }}" placeholder="{{ __('Username') }}" required autofocus>

                    @if ($errors->has('username'))
                    <span class="alert d-block mt-1 alert-danger" role="alert">
                        <strong>{{ $errors->first('username') }}</strong>
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
