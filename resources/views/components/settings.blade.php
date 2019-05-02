<div class="row m-0 justify-content-center">
    <div class="mt-4 col-10 col-xl-8">
        <div class="card row flex-row">
            <div class="card-header sidemenu col-12 col-md-4">
                <h3 class="sidemenu-title">{{trans("sidebar.confprofile")}}</h3>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a href="{{ route('profile.edit') }}" 
                        class="sidemenu-option {{ $option === 0 ? 'setting-active' : '' }}">{{trans("settings.edit_profile")}}</a>
                    </li>
                    <li class="nav-item">
                        <a href="{{ route('website.edit') }}" 
                        class="sidemenu-option {{ $option === 1 ? 'setting-active' : '' }}">{{trans("settings.edit_website")}}</a>
                    </li>
                </ul>
            </div>
            <div class="card-body col-12 col-md-8">
                {{ $form }}
            </div>
        </div>
    </div>
</div>
