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
            <nav id="sidebar" class="col p-0">
                <ul class="navbar-nav">
                    <li class="nav-item"><a href="{{ route('index') }}"><span class="icon-centered icon-home"></span></a></li>

                    @guest
                        <li class="nav-item"><a dusk='link_login' href="{{ route('login') }}"><span class="icon-centered icon-login"></span></a></li>
                    @endguest

                    @auth
                    <li class="nav-item"><a href="{{ route('home') }}"><span class="icon-centered icon-books"></span></a></li>
                    @endauth

                    <li class="nav-item"><a href="{{ route('info') }}"><span class="icon-centered icon-info"></span></a></li>

                    @auth
                        <li class="nav-item">
                            <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                <span class="icon-centered icon-off"></span>
                            </a>
                            <form id="logout-form" ckass="d-none" action="{{ route('logout') }}" method="POST">
                                @csrf
                            </form>
                        </li>
                    @endauth
                </ul>
            </nav>

            <main class="col p-0">

                @if ($logo)
                    <div class="row m-0 my-3">
                        <div class="col-12 p-0 text-center text-md-right">
                            <div id="logo" class="mx-3"></div>
                        </div>
                    </div>
                @endif

                @yield('content')
            </main>
        </div>
    </div>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
</body>
</html>
