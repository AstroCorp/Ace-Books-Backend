@extends('layouts.app', ['logo' => false])
@section('bg', 'blur-bg')
@section('logo', 'false')

@section('content')
<div class="row m-0 h-100 justify-content-center">
    <div class="col-10 col-md-8 col-xl-6">
        <div class="card mt-4">
            <div class="card-header">{{ __('Verify Your Email Address') }}</div>

            <div class="card-body">
                @if (session('resent'))
                <div class="alert alert-success" role="alert">
                    {{ __('A fresh verification link has been sent to your email address.') }}
                </div>
                @endif

                {{ __('Before proceeding, please check your email for a verification link.') }}
                {{ __('If you did not receive the email') }}, <a
                    href="{{ route('verification.resend') }}">{{ __('click here to request another') }}</a>.
            </div>
        </div>
    </div>
</div>
@endsection
