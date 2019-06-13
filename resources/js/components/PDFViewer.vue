<template>
	<div>
        <nav id="topbar" class="col-12 p-0">
            <ul class="row nav justify-content-between m-0">
                <span class="nav col-12 col-sm-auto p-0">
                    <li class="nav-item"><a :href="back"><span class="icon-centered icon-back"></span></a></li>
                    <li class="nav-item" v-if="mode === 'paginate'" @click="changeMode()"><a href="#"><span class="icon-centered icon-cascade"></span></a></li>
                    <li class="nav-item" v-if="mode === 'cascade'" @click="changeMode()"><a href="#"><span class="icon-centered icon-paginate"></span></a></li>
                    <li class="nav-item" @click="openBookmarks" data-toggle="modal" data-target="#modalCenter"><a href="#"><span class="icon-centered icon-bookmarks"></span></a></li>
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
                    <li class="nav-item"><a><span class="icon-centered hidden-icon"></span></a></li>
                    <li class="nav-item"><a href="#" @click="previousPage()"><span class="icon-centered icon-page-back"></span></a></li>
                    <li class="nav-item"><a href="#" @click="nextPage()"><span class="icon-centered icon-page-next"></span></a></li>
                </span>
            </ul>
        </nav>
		<div class="pdf-document" ref="reader" v-bind:class="{ 'overflow-x-active': checkZoom }">
            <div class="grid" v-bind:class="{ 'transform-active': checkZoom }" :style="'-ms-transform: scale(' + zoom + ', ' + zoom + '); -webkit-transform: scale(' + zoom + ', ' + zoom + '); transform: scale( ' + zoom + ', ' + zoom + ');'">
                <div
                class="mx-auto pdf-page"
                v-for="i in numPages"
                v-show="mode === 'cascade' || (mode === 'paginate' && i == currentPage)"
                :key="i">
                    <pdf
                        v-if="i >= currentPage - 3 && i <= currentPage + 3 || i === 1"
                        :ref="'page' + i"
                        :src="src"
                        :page="i"
                        :style="'width: 100%;'"
                        @page-loaded="pageHeight === 0 ? pageHeight = $refs['page1'][0].$el.clientHeight : null"
		            />
                    <pdf
                        v-else
                        :ref="'page' + i"
                        :style="'height: ' + pageHeight + 'px;'"
		            />
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="modalCenter" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="form-btn" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#modalCenterAdd" @click="resetForms()">
                  Add
                </button>

                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <span v-if="bookmarks.length === 0" class="col-12 alert d-block mt-1 alert-info text-center" role="alert">
                    <strong>No hay nah</strong>
                </span>
                <span v-if="deleteCommentStatus" class="col-12 alert d-block mt-1 alert-danger text-center" role="alert">
                    <strong>deleted!</strong>
                </span>
                <div id="accordion">
                    <div v-for="bookmark in bookmarks" :key="bookmark.id" class="card mb-1">
                        <button :id="'heading_' + bookmark.id" class="card-header btn collapsed" data-toggle="collapse" @click="resetForms()"
                            :data-target="'#collapse_' + bookmark.id" aria-expanded="false" :aria-controls="'collapse_' + bookmark.id"
                            :style="'background-color:' + bookmark.color">
                            <h5 class="m-0 text-left">Page: {{ bookmark.page }} <a class="float-right text-black-50" @click="deleteBookmark(bookmark.id)" href="#">Delete</a></h5>
                        </button>

                        <div :id="'collapse_' + bookmark.id" class="collapse" :aria-labelledby="'heading_'  + bookmark.id" data-parent="#accordion">
                            <div class="card-body p-0 pb-3">
                                <span v-if="updateCommentStatus && lastUpdated ===bookmark.id" class="col-12 alert d-block m-0 alert-success text-center" role="alert">
                                    <strong>updated!</strong>
                                </span>
                                <textarea placeholder="Comment... " class="comment p-2 mb-2" v-model="bookmark.comment"></textarea>
                                <a class="form-btn" @click="updateBookmark(bookmark.id, bookmark.comment)" href="#">Edit</a>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="modalCenterAdd" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true" @click="resetForms()">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <span v-if="newCommentStatus !== null" class="col-12 alert d-block mt-1 text-center" v-bind:class="{ 'alert-success': newCommentStatus, 'alert-danger': !newCommentStatus }" role="alert">
                    <strong v-if="newCommentStatus">Ok!</strong>
                    <strong v-else>Error!</strong>
                </span>
                <textarea placeholder="Comment... " class="comment p-2 mb-2" v-model="newComment"></textarea>
                <a class="form-btn" @click="addBookmark()" href="#">Add</a>
              </div>
            </div>
          </div>
        </div>
	</div>
</template>

<script>
import pdf from 'vue-pdf';

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

            checkZoom: false,
            zoom: 0.5,
            pageHeight: 0,

            mode: 'cascade',
            src: pdf.createLoadingTask(this.url),
            reader: undefined,

            bookmarks: [],

            newComment: '',
            newCommentStatus: null,
            deleteCommentStatus: false,
            updateCommentStatus: null,
            lastUpdated: 0,
		}
    },
    props: [
        'url',
        'idBook',
        'back'
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

            this.updatePageWithInput();
        },
        getPDF()
        {
            this.src.then(pdf =>
            {
			    this.numPages = pdf.numPages;
		    });
        },
        openBookmarks()
        {
            this.loadBookmarks();
        },
        loadBookmarks()
        {
            axios.post('/bookmarks',
            {
                '_token': this.csrf,
                'book': this.idBook
            })
            .then(function(response)
            {
                this.bookmarks = response.data.bookmarks;
            }
            .bind(this));
        },
        deleteBookmark(bookmark)
        {
            axios.post('/bookmarks/delete',
            {
                '_token': this.csrf,
                'book': this.idBook,
                bookmark
            })
            .then(function(response)
            {
                if(response.data.status)
                {
                    this.loadBookmarks();
                    this.deleteCommentStatus = true;
                }
            }
            .bind(this));
        },
        addBookmark()
        {
            axios.post('/bookmarks/add',
            {
                '_token': this.csrf,
                'book': this.idBook,
                'page': this.currentPage,
                'comment': this.newComment
            })
            .then(function(response)
            {
                this.loadBookmarks();
                this.newCommentStatus = response.data.status;
                this.newComment = '';
            }
            .bind(this));
        },
        resetForms()
        {
            this.newCommentStatus = null;
            this.newComment = '';
            this.deleteCommentStatus = false;
            this.updateCommentStatus = false;
        },
        updateBookmark(bookmark, comment)
        {
            axios.post('/bookmarks/update',
            {
                '_token': this.csrf,
                'book': this.idBook,
                'bookmark': bookmark,
                'comment': comment
            })
            .then(function(response)
            {
                if(response.data.status)
                {
                    this.loadBookmarks();
                    this.updateCommentStatus = true;
                    this.lastUpdated = response.data.id;
                }
            }
            .bind(this));
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
        },
        zoom: function()
        {
            this.checkZoom = this.zoom > 1;
        }
    }
}

</script>
