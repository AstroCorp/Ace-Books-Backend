<template>
    <div>
        <library-list :collections="collections" :books="books" />
        
        <div :class="{ 'active-library-menu': isActive }" class="library-menu">

            <span @click="MenuBtn" id="toggle-library" class="icon-centered icon-storage"></span>

            <form class="row search-bar justify-content-center" @:submit.prevent>
                <input type="hidden" name="_token" :value="csrf">

                <div class="col-11 form-group mt-3">
                    <input class="form-control" type="text" name="search" v-model="search" placeholder="Buscar...">
                </div>

                <a class="col-12 col-sm-6 library-menu-option" href="#"><span class="mb-2 icon-centered icon-open-collection"></span>Add collection</a>
                <a class="col-12 col-sm-6 library-menu-option" href="#"><span class="mb-2 icon-centered icon-open-book"></span>Add book</a>
            </form>
        </div>
    </div>
</template>

<script>
    export default
    {
        data()
        {
            return {
                isActive: false,
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                search: '',

                collections: [],
                books: []
            }
        },
        mounted()
        {
            this.search_POST();
        },
        watch:
        {
            search: _.debounce(function()
            {
                this.search_POST();
            }, 
            200)
        },
        methods:
        {
            search_POST()
            {
                axios.post('library',
                {
                    '_token': this.csrf,
                    'search': this.search
                })
                .then(function(response)
                {
                    this.collections = response.data.collections;
                    this.books = response.data.books;
                }
                .bind(this));
            },

            MenuBtn()
            {
                this.isActive = !this.isActive;
            }
        }
    }
</script>
