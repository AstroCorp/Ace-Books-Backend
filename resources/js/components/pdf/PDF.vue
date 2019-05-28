<template>
    <div class="row">
        <nav id="topbar" class="col-12">
            <ul class="nav justify-content-between">
                <span class="nav">
                    <li class="nav-item"><a href="/home"><span class="icon-centered icon-back"></span></a></li>
                </span>
                <span class="nav">
                    <li class="nav-item"><a href="#"><span class="icon-centered icon-page-auto"></span></a></li>
                    <li class="nav-item"><a href="#"><span class="icon-centered icon-page-full"></span></a></li>
                    <li class="nav-item"><span>x / x</span></li>
                    <li class="nav-item"><a href="#"><span class="icon-centered icon-zoom-in"></span></a></li>
                    <li class="nav-item"><a href="#"><span class="icon-centered icon-zoom-out"></span></a></li>
                </span>
                <span class="nav">
                    <li class="nav-item"><a href="#"><span class="icon-centered icon-page-back"></span></a></li>
                    <li class="nav-item"><a href="#"><span class="icon-centered icon-page-next"></span></a></li>
                </span>  
            </ul>
        </nav>
        <pdf-thumbnail class="col-4 d-none" v-bind="{url, scale: 0.4}" />
        <pdf-document class="col-12" v-bind="{url, scale: 2}" />
    </div>
</template>

<script>
    export default
    {
        props: [
            'url'
        ]
    }
</script>
