<template>
	<div>
        <nav id="topbar" class="col-12">
            <ul class="nav justify-content-between">
                <span class="nav">
                    <li class="nav-item"><a href="/home"><span class="icon-centered icon-back"></span></a></li>
                </span>
                <span class="nav">
                    <li class="nav-item"><a href="#" @click="updateZoom('auto')"><span class="icon-centered icon-page-auto"></span></a></li>
                    <li class="nav-item"><a href="#" @click="updateZoom('full')"><span class="icon-centered icon-page-full"></span></a></li>
                    <li class="nav-item"><span>{{currentPage}} / {{pageCount}}</span></li>
                    <li class="nav-item"><a href="#" @click="updateZoom(10)"><span class="icon-centered icon-zoom-in"></span></a></li>
                    <li class="nav-item"><a href="#" @click="updateZoom(-10)"><span class="icon-centered icon-zoom-out"></span></a></li>
                </span>
                <span class="nav">
                    <li class="nav-item"><a href="#"><span class="icon-centered icon-page-back"></span></a></li>
                    <li class="nav-item"><a href="#"><span class="icon-centered icon-page-next"></span></a></li>
                </span>  
            </ul>
        </nav>
		<div class="pdf-document" v-bind:class="{ 'overflow-x-active': checkZoom }">
            <pdf-page
                class="mx-auto pdf-page"
                v-for="i in 2"
                :key="i"
                :src="url"
                :page="i"
                :style="'display: block; width: ' + zoom + '%;'"
		    />
        </div>
	</div>
</template>

<script>

export default 
{
    data() 
    {
		return {
			currentPage: 0,
            pageCount: 0,

            zoom: 50,
		}
    },
    props: [
        'url'
    ],
    methods:
    {
        checkZoom()
        {
            return this.zoom > 100;
        },
        updateZoom(zoom)
        {
            //event.preventDefault();
            
            if(zoom === 'auto')
            {
                if(window.innerWidth < 600)
                {
                    this.zoom = 100;
                }
                else if(window.innerWidth < 1000)
                {
                    this.zoom = 75;
                }
                else
                {
                    this.zoom = 50;
                }
            }
            else if(zoom === 'full')
            {
                this.zoom = 100;
            }
            else
            {
                if(zoom < 0 && this.zoom === 10 || zoom > 0 && this.zoom === 200)
                {
                    return;
                }
                
                this.zoom += zoom;
            }
        }
    }
}

</script>