<template>
	<div>
        <nav id="topbar" class="col-12 p-0">
            <ul class="row nav justify-content-between m-0">
                <span class="nav col-12 col-sm-auto p-0">
                    <li class="nav-item"><a href="/home"><span class="icon-centered icon-back"></span></a></li>
                    <li class="nav-item" v-if="mode === 'paginate'" @click="changeMode()"><a href="#"><span class="icon-centered icon-cascade"></span></a></li>
                    <li class="nav-item" v-if="mode === 'cascade'" @click="changeMode()"><a href="#"><span class="icon-centered icon-paginate"></span></a></li>
                </span>
                <span class="nav col-12 col-sm-auto p-0">
                    <li class="nav-item"><a href="#" @click="updateZoom('auto')"><span class="icon-centered icon-page-auto"></span></a></li>
                    <li class="nav-item"><a href="#" @click="updateZoom('full')"><span class="icon-centered icon-page-full"></span></a></li>
                    <li class="nav-item numPages">
                        <input type="number" name="currentPage" class="input-currentPage" v-model="currentPage" @change="updatePageWithInput()" min="1" :max="numPages">
                        <span class="pr-3"> / </span><span>{{numPages}}</span>
                    </li>
                    <li class="nav-item"><a href="#" @click="updateZoom(10)"><span class="icon-centered icon-zoom-in"></span></a></li>
                    <li class="nav-item"><a href="#" @click="updateZoom(-10)"><span class="icon-centered icon-zoom-out"></span></a></li>
                </span>
                <span class="nav col-12 col-sm-auto p-0">
                    <li class="nav-item"><a href="#" @click="previousPage()"><span class="icon-centered icon-page-back"></span></a></li>
                    <li class="nav-item"><a href="#" @click="nextPage()"><span class="icon-centered icon-page-next"></span></a></li>
                </span>  
            </ul>
        </nav>
		<div class="pdf-document" ref="reader" v-bind:class="{ 'overflow-x-active': checkZoom }">
            <pdf-page
                class="mx-auto pdf-page"
                v-for="i in showPages"
                v-show="mode === 'cascade' || (mode === 'paginate' && i === currentPage)"
                :key="i"
                :ref="'page' + i"
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
			currentPage: 1,
            numPages: 0,
            showPages: 1,

            zoom: 50,

            mode: 'cascade',

            reader: undefined,
		}
    },
    props: [
        'url'
    ],
    created() 
    {
        this.getPDF();
    },
    mounted: function()
    {
        this.reader = this.$refs['reader'];
        this.reader.addEventListener('scroll', this.updatePageWithScroll);
    },
    methods:
    {
        changeMode()
        {
            if(this.mode === 'cascade')
            {
                this.mode = 'paginate';
            }
            else
            {
                this.mode = 'cascade';
            }
        },
        updatePageWithScroll()
        {
            if(this.mode === 'cascade')
            {
                // Nivel de scroll / tamaño de la página + 1
                let calc = Math.floor((this.reader.scrollTop / (this.$refs['page1'][0].$el.clientHeight + 10)) + 1);
                this.currentPage = calc;
            }
        },
        updatePageWithInput()
        {
            if(this.mode === 'cascade')
            {
                // Tamaño de la página * número de páginas
                let calc = (this.$refs['page1'][0].$el.clientHeight + 10) * (this.currentPage - 1);
                this.reader.scrollTo(0, calc);
            }
        },
        nextPage()
        {
            if(this.currentPage >= this.numPages)
            {
                return;
            }

            this.currentPage++;
            this.updatePageWithInput();
        },
        previousPage()
        {
            if(this.currentPage === 1)
            {
                return;
            }

            this.currentPage--;
            this.updatePageWithInput();
        },
        checkZoom()
        {
            return this.zoom > 100;
        },
        updateZoom(zoom)
        {
            if(zoom === 'auto')
            {
                if(window.innerWidth <= 600)
                {
                    this.zoom = 100;
                }
                else if(window.innerWidth > 600 && window.innerWidth < 1000)
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
        },
        getPDF()
        {
            let pdfjsLib = require('pdfjs-dist');
            pdfjsLib.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker');
            this.pdf = pdfjsLib.getDocument(this.url);

            this.pdf.promise.then(message =>
            {
                this.numPages = message._pdfInfo.numPages;
                
                if(this.numPages <= 10)
                {
                    this.showPages = this.numPages;
                }
                else
                {
                    this.showPages = 10;
                }
            });
        }
    },
    watch:
    {
        currentPage: function(currentPage)
        {
            console.log(currentPage);

            if(currentPage === this.showPages && this.showPages < this.numPages)
            {
                if(this.numPages - this.showPages >= 10)
                {
                    this.showPages += 10;
                }
                else
                {
                    this.showPages += (this.numPages - this.showPages);
                }
            }
        }
    }
}

</script>