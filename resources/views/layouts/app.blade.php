<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="{{ asset('images/favicon.ico') }}">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Ace Books') }}</title>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div class="@yield('bg', 'background')"></div>
    <div id="app" class="container-fluid">
        <div class="row">
            @component('components.sidebar')
            @endcomponent

            <main class="col p-0">
                <nav id="menu" class="navbar navbar-dark bg-dark">
                    <a class="navbar-brand" href="#">Ace Books</a>
                    <button class="navbar-toggler border-0" type="button"
                    data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation" id="menu-toggle">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </nav>

                <div class="d-sm-none m-4 p-2"></div>

                @if ($logo)
                    <div class="row m-0 my-3 d-none d-sm-block">
                        <div class="col-12 p-0 text-center text-md-right">
                            <a href="/" id="logo" class="mx-3"></a>
                        </div>
                    </div>
                @endif

                @yield('content')
            </main>
        </div>
    </div>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}"></script>
    @yield('scripts')
</body>
</html>
