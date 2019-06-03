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

        <li class="nav-item">
            <a href="{{ route('storage') }}">
                <span class="icon-centered icon-storage">
                    <span class="sidebar-subtitle">
                        <span>{{trans("sidebar.storage")}}</span>
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
            @rank_more_or_equal(2)
                <li class="mt-sm-auto nav-item">
                    <a href="{{ route('cpanel') }}">
                        <span class="icon-centered icon-cpanel">
                            <span class="sidebar-subtitle">
                                <span>{{trans("sidebar.cpanel")}}</span>
                            </span>
                        </span>
                    </a>
                </li>
            @endrank_more_or_equal

                @rank_less_or_equal(1)
                    <li class="mt-sm-auto nav-item">
                @else
                    <li class="nav-item">
                @endrank_less_or_equal
                <a href="{{ route('profile.edit') }}">
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
