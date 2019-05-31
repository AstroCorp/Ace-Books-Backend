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
                        <input type="number" name="currentPage" class="input-currentPage" v-model="currentPage" @change="updatePageWithInput" min="1" :max="numPages">
                        <span class="pr-3"> / </span><span>{{numPages}}</span>
                    </li>
                    <li class="nav-item"><a href="#" @click="updateZoom(0.1)"><span class="icon-centered icon-zoom-in"></span></a></li>
                    <li class="nav-item"><a href="#" @click="updateZoom(-0.1)"><span class="icon-centered icon-zoom-out"></span></a></li>
                </span>
                <span class="nav col-12 col-sm-auto p-0">
                    <li class="nav-item"><a href="#" @click="previousPage()"><span class="icon-centered icon-page-back"></span></a></li>
                    <li class="nav-item"><a href="#" @click="nextPage()"><span class="icon-centered icon-page-next"></span></a></li>
                </span>
            </ul>
        </nav>
		<div class="pdf-document" ref="reader" v-bind:class="{ 'overflow-x-active': checkZoom }">
            <div class="grid" :style="'-ms-transform: scale(' + zoom + ', ' + zoom + '); -webkit-transform: scale(' + zoom + ', ' + zoom + '); transform: scale( ' + zoom + ', ' + zoom + ');'">
                <pdf
                    class="mx-auto pdf-page"
                    v-for="i in numPages"
                    v-show="mode === 'cascade' || (mode === 'paginate' && i == currentPage)"
                    :key="i"
                    :ref="'page' + i"
                    :src="src"
                    :page="i"
                    :style="'width: 100%;'"
		        />
            </div>
        </div>
	</div>
</template>

<script>
import pdf from 'vue-pdf';
var loadingTask = pdf.createLoadingTask('/books/x.pdf');

export default
{
    components: {
		pdf
	},
    data()
    {
		return {
			currentPage: 1,
            numPages: 0,

            zoom: 0.5,

            mode: 'cascade',
            src: loadingTask,
            reader: undefined,
		}
    },
    props: [
        'url'
    ],
    mounted: function()
    {
        this.reader = this.$refs['reader'];
        this.reader.addEventListener('scroll', this.updatePageWithScroll);

        this.getPDF();
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

                setTimeout(function() 
                {
                    this.updatePageWithInput(true);
                }
                .bind(this), 50);
            }
        },
        updatePageWithScroll()
        {
            if(this.mode === 'cascade')
            {
                // (scroll actual / ((tamaño de la página * escala) + (margin-bottom * escala))) + 1 (este 1 es para mostrar bien el número de página, ya que es un array)
                let calc = Math.floor((this.reader.scrollTop / ((this.$refs['page1'][0].$el.clientHeight * this.zoom) + (10 * this.zoom))) + 1);
                this.currentPage = calc;
            }
        },
        updatePageWithInput(activate = false)
        {
            if(this.mode === 'cascade' || activate)
            {
                this.reader.removeEventListener('scroll', this.updatePageWithScroll);

                // ((Tamaño de la página * escala) * número de páginas) + (número de páginas * (margin-button * escala))
                let calc = (this.$refs['page1'][0].$el.clientHeight * this.zoom) * (this.currentPage - 1) + ((this.currentPage - 1) * (10 * this.zoom));
                this.reader.scrollTo(0, calc);

                setTimeout(function() 
                {
                    this.reader.addEventListener('scroll', this.updatePageWithScroll);
                }
                .bind(this), 150);
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
                    this.zoom = 1;
                }
                else if(window.innerWidth > 600 && window.innerWidth < 1000)
                {
                    this.zoom = 0.75;
                }
                else
                {
                    this.zoom = 0.5;
                }
            }
            else if(zoom === 'full')
            {
                this.zoom = 1;
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
            this.src.then(pdf =>
            {
			    this.numPages = pdf.numPages;
		    });
        }
    },
    watch:
    {
        currentPage: function(currentPage)
        {
            if(this.currentPage < 1)
            {
                this.currentPage = 1;
            }
            else if(this.currentPage > this.numPages)
            {
                this.currentPage = this.numPages;
            }
        }
    }
}

</script>
