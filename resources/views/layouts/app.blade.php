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
                <ul class="h-100 navbar-nav">
                    <li class="nav-item">
                        <a href="{{ route('index') }}">
                            <span class="icon-centered icon-home">
                                <span class="sidebar-subtitle">
                                    <span>{{trans("sidebar.home")}}</span>
                                </span>
                            </span>
                        </a>
                    </li>

                    @guest
                        <li class="nav-item">
                            <a dusk='link_login' href="{{ route('login') }}">
                                <span class="icon-centered icon-login">
                                    <span class="sidebar-subtitle">
                                        <span>{{trans("sidebar.login")}}</span>
                                    </span>
                                </span>

                            </a>
                        </li>
                    @endguest

                    @auth
                    <li class="nav-item">
                        <a href="{{ route('home') }}">
                            <span class="icon-centered icon-books">
                                <span class="sidebar-subtitle">
                                    <span>{{trans("sidebar.library")}}</span>
                                </span>
                            </span>
                        </a>
                    </li>
                    @endauth

                    <li class="nav-item">
                        <a href="{{ route('info') }}">
                            <span class="icon-centered icon-info">
                                <span class="sidebar-subtitle">
                                    <span>{{trans("sidebar.info")}}</span>
                                </span>
                            </span>

                        </a>
                    </li>

                    @auth
                        <li class="mt-sm-auto nav-item">
                            <a href="{{ route('profile') }}">
                                <span class="icon-centered icon-conf">
                                    <span class="sidebar-subtitle">
                                        <span>{{trans("sidebar.confprofile")}}</span>
                                    </span>
                                </span>

                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                <span class="icon-centered icon-off">
                                    <span class="sidebar-subtitle">
                                        <span>{{trans("sidebar.exit")}}</span>
                                    </span>
                                </span>
                            </a>
                            <form id="logout-form" ckass="d-none" action="{{ route('logout') }}" method="POST">
                                @csrf
                            </form>
                        </li>
                    @endauth
                </ul>
            </nav>

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
